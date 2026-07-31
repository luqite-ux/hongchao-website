import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ProxyAgent, setGlobalDispatcher } from 'undici'

if (process.env.HTTPS_PROXY) setGlobalDispatcher(new ProxyAgent(process.env.HTTPS_PROXY))

const PROJECT_ID = process.env.HONGCHAO_SANITY_PROJECT_ID || 'rbkc9qwm'
const DATASET = process.env.HONGCHAO_SANITY_DATASET || 'production'
const API_VERSION = '2024-01-01'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const query = String.raw`{
  "categories": *[_type == "productCategory" && !(_id in path("drafts.**"))] | order(title asc) {
    _id, title, title_de, title_es, "slug": slug.current,
    description, description_de, description_es, "imageUrl": image.asset->url
  },
  "products": *[_type == "product" && !(_id in path("drafts.**"))] | order(title asc) {
    _id, title, title_de, title_es, "slug": slug.current,
    summary, summary_de, summary_es, content, content_de, content_es,
    specs, applications,
    "categoryId": category->_id, "categoryTitle": category->title, "categorySlug": category->slug.current,
    "heroImageUrl": heroImage.asset->url,
    "galleryUrls": galleryImages[].asset->url,
    "technicalImageUrls": technicalImages[].asset->url,
    "engineeringImageUrl": engineeringImage.asset->url,
    "packagingImageUrl": packagingImage.asset->url
  },
  "posts": *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc, _createdAt desc) {
    _id, title, title_de, title_es, "slug": slug.current,
    excerpt, excerpt_de, excerpt_es, content, content_de, content_es,
    publishedAt, "coverImageUrl": coverImage.asset->url
  },
  "inquiryCount": count(*[_type == "inquiry" && !(_id in path("drafts.**"))])
}`

function allAssetUrls(source) {
  const urls = []
  for (const category of source.categories) if (category.imageUrl) urls.push(category.imageUrl)
  for (const product of source.products) {
    urls.push(product.heroImageUrl, ...(product.galleryUrls || []), ...(product.technicalImageUrls || []), product.engineeringImageUrl, product.packagingImageUrl)
  }
  for (const post of source.posts) if (post.coverImageUrl) urls.push(post.coverImageUrl)
  return [...new Set(urls.filter(Boolean))]
}

function validate(source) {
  const errors = []
  const categorySlugs = new Set(source.categories.map((row) => row.slug).filter(Boolean))
  for (const category of source.categories) if (!category.slug) errors.push(`category ${category._id} is missing slug`)
  for (const product of source.products) {
    if (!product.slug) errors.push(`product ${product._id} is missing slug`)
    if (!product.categorySlug || !categorySlugs.has(product.categorySlug)) errors.push(`product ${product._id} has unresolved category`)
  }
  for (const post of source.posts) if (!post.slug) errors.push(`post ${post._id} is missing slug`)
  return errors
}

async function main() {
  const url = new URL(`https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`)
  url.searchParams.set('query', query)
  const response = await fetch(url, { signal: AbortSignal.timeout(90_000) })
  if (!response.ok) throw new Error(`Sanity HTTP ${response.status}: ${(await response.text()).slice(0, 300)}`)
  const payload = await response.json()
  const source = payload.result
  const errors = validate(source)
  const inventory = {
    exported_at: new Date().toISOString(),
    source: { project_id: PROJECT_ID, dataset: DATASET },
    counts: {
      categories: source.categories.length,
      products: source.products.length,
      posts: source.posts.length,
      inquiries: source.inquiryCount,
      unique_assets: allAssetUrls(source).length,
    },
    validation_errors: errors,
    assets: allAssetUrls(source),
    categories: source.categories,
    products: source.products,
    posts: source.posts,
  }
  const outDir = path.resolve(__dirname, '..', 'migration')
  mkdirSync(outDir, { recursive: true })
  writeFileSync(path.join(outDir, 'hongchao-source-inventory.json'), JSON.stringify(inventory, null, 2) + '\n', 'utf8')
  console.log(JSON.stringify({ counts: inventory.counts, validation_errors: errors.length }))
  if (errors.length) process.exitCode = 2
}

main().catch((error) => { console.error(error.message); process.exit(1) })
