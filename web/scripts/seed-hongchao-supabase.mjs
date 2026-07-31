import { readFileSync } from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { createClient } from '@supabase/supabase-js'
import { ProxyAgent, setGlobalDispatcher } from 'undici'
import { HONGCHAO_TENANT_ID, mapSanityCategory, mapSanityPost, mapSanityProduct } from './hongchao-migration-map.mjs'

if (process.env.HTTPS_PROXY) setGlobalDispatcher(new ProxyAgent(process.env.HTTPS_PROXY))
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function replaceAssetUrls(value, assetMap) {
  if (typeof value === 'string') return assetMap.get(value) || value
  if (Array.isArray(value)) return value.map((item) => replaceAssetUrls(item, assetMap))
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, replaceAssetUrls(item, assetMap)]))
  return value
}

function contentUrls(value, urls = []) {
  if (typeof value === 'string' && /^https:\/\//i.test(value)) urls.push(value)
  else if (Array.isArray(value)) for (const item of value) contentUrls(item, urls)
  else if (value && typeof value === 'object') for (const item of Object.values(value)) contentUrls(item, urls)
  return urls
}

export function assertR2Rows(rows, tenantId, publicPrefix) {
  for (const row of rows) {
    if (row.tenant_id !== tenantId) throw new Error(`foreign tenant row: ${row.slug || row.id}`)
    for (const url of contentUrls({ image_url: row.image_url, featured_image: row.featured_image, icon: row.icon, extra_data: row.extra_data })) {
      if (!url.startsWith(`${publicPrefix.replace(/\/$/, '')}/`)) throw new Error(`content image is not an R2 URL: ${url}`)
    }
  }
}

function extensionFor(url, contentType) {
  const fromPath = new URL(url).pathname.match(/\.([a-zA-Z0-9]{2,5})$/)?.[1]?.toLowerCase()
  if (fromPath) return fromPath === 'jpeg' ? 'jpg' : fromPath
  return ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg' })[contentType] || 'bin'
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length)
  let cursor = 0
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await fn(items[index], index)
    }
  }))
  return results
}

async function upsertRows(supabase, table, rows) {
  const { error } = await supabase.from(table).upsert(rows, { onConflict: 'tenant_id,slug' })
  if (error) throw new Error(`${table} upsert failed: ${error.message}`)
}

async function main() {
  const required = ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'R2_S3_ENDPOINT', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME']
  for (const key of required) if (!process.env[key]?.trim()) throw new Error(`missing ${key}`)
  const publicPrefix = (process.env.R2_PUBLIC_URL || process.env.R2_PUBLIC_URL_PREFIX || process.env.NEXT_PUBLIC_R2_PUBLIC_URL_PREFIX || '').replace(/\/$/, '')
  if (!publicPrefix.startsWith('https://')) throw new Error('missing R2 public HTTPS prefix')

  const inventory = JSON.parse(readFileSync(path.resolve(__dirname, '..', 'migration', 'hongchao-source-inventory.json'), 'utf8'))
  if (inventory.validation_errors?.length) throw new Error(`source inventory has ${inventory.validation_errors.length} validation errors`)

  const r2 = new S3Client({
    region: 'auto', endpoint: process.env.R2_S3_ENDPOINT,
    requestChecksumCalculation: 'WHEN_REQUIRED', responseChecksumValidation: 'WHEN_REQUIRED',
    credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
  })
  const assetPairs = await mapLimit(inventory.assets, 6, async (sourceUrl, index) => {
    const response = await fetch(sourceUrl, { signal: AbortSignal.timeout(90_000) })
    if (!response.ok) throw new Error(`asset HTTP ${response.status}: ${sourceUrl}`)
    const bytes = Buffer.from(await response.arrayBuffer())
    const contentType = (response.headers.get('content-type') || 'application/octet-stream').split(';')[0]
    const hash = createHash('sha256').update(sourceUrl).digest('hex').slice(0, 24)
    const key = `products/${HONGCHAO_TENANT_ID}/sanity/${hash}.${extensionFor(sourceUrl, contentType)}`
    await r2.send(new PutObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: key, Body: bytes, ContentType: contentType, CacheControl: 'public, max-age=31536000, immutable' }))
    if ((index + 1) % 25 === 0 || index + 1 === inventory.assets.length) console.log(`assets ${index + 1}/${inventory.assets.length}`)
    return [sourceUrl, `${publicPrefix}/${key.split('/').map(encodeURIComponent).join('/')}`]
  })
  const assetMap = new Map(assetPairs)

  const categories = inventory.categories.map((doc, index) => replaceAssetUrls(mapSanityCategory(doc, HONGCHAO_TENANT_ID, index + 1), assetMap))
  const products = inventory.products.map((doc, index) => replaceAssetUrls(mapSanityProduct(doc, HONGCHAO_TENANT_ID, index + 1), assetMap))
  const posts = inventory.posts.map((doc) => replaceAssetUrls(mapSanityPost(doc, HONGCHAO_TENANT_ID), assetMap))
  assertR2Rows([...categories, ...products, ...posts], HONGCHAO_TENANT_ID, publicPrefix)

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  await upsertRows(supabase, 'product_categories', categories)
  await upsertRows(supabase, 'products', products)
  await upsertRows(supabase, 'articles', posts)
  console.log(JSON.stringify({ categories: categories.length, products: products.length, articles: posts.length, assets: assetMap.size }))
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  main().catch((error) => { console.error(error.message); process.exit(1) })
}
