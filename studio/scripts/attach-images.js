/**
 * 按 --folder 将本地图片上传并挂到对应产品的 heroImage / galleryImages / gallery / seo.ogImage
 * 每张图始终从本地文件 client.assets.upload('image', …)，不按 originalFilename 查找已有资源，避免不同文件夹同名图挂错。
 * 运行：node scripts/attach-images.js --folder 01
 */
const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')
const { createReadStream } = require('fs')

const DATA_DIR = path.resolve(process.cwd(), 'data')
const STATE_PATH = path.resolve(process.cwd(), 'scripts', 'state.json')

const IMAGE_EXT = new Set(
  ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'].map((e) => e.toLowerCase())
)
const UPLOAD_TIMEOUT_MS = 120_000
const PER_OP_TIMEOUT_MS = 90_000
const MAX_RETRIES = 4
const RETRY_DELAY_MS = 2500

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) return
  const content = fs.readFileSync(envPath, 'utf-8')
  for (const line of content.split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/)
    if (m) {
      const key = m[1]
      const value = m[2].replace(/^["']|["']$/g, '').trim()
      if (!process.env[key]) process.env[key] = value
    }
  }
}

loadEnv()

const PROJECT_ID = process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID
const DATASET = process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'
const TOKEN = process.env.SANITY_WRITE_TOKEN

function requireEnv() {
  const missing = []
  if (!PROJECT_ID) missing.push('SANITY_PROJECT_ID 或 SANITY_STUDIO_PROJECT_ID')
  if (!DATASET) missing.push('SANITY_DATASET 或 SANITY_STUDIO_DATASET')
  if (!TOKEN) missing.push('SANITY_WRITE_TOKEN')
  if (missing.length > 0) {
    console.error('缺少环境变量，请在 studio/.env.local 中配置：')
    missing.forEach((m) => console.error('  -', m))
    process.exit(1)
  }
}

function normalizeFolder(folderRaw) {
  if (folderRaw === undefined || folderRaw === null || folderRaw === '') return ''
  const s = String(folderRaw).trim()
  const n = parseInt(s, 10)
  if (Number.isNaN(n)) return s
  return n >= 0 && n <= 99 ? n.toString().padStart(2, '0') : s
}

function listImageFiles(dir) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return []
  return fs
    .readdirSync(dir)
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
}

function isNetworkError(err) {
  const code = err && typeof err === 'object' && 'code' in err ? err.code : ''
  const msg = err instanceof Error ? err.message : String(err ?? '')
  const msgLower = msg.toLowerCase()
  return (
    code === 'ETIMEDOUT' ||
    code === 'ECONNRESET' ||
    code === 'ENOTFOUND' ||
    code === 'ECONNREFUSED' ||
    code === 'EPIPE' ||
    msgLower.includes('socket hang up') ||
    msgLower.includes('socket hang') ||
    msg.includes('write ret') ||
    msgLower.includes('econnreset') ||
    msgLower.includes('fetch')
  )
}

function withTimeout(p, ms, label) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`${label} 超时 (${ms}ms)`)), ms)
    p.then(
      (v) => {
        clearTimeout(t)
        resolve(v)
      },
      (e) => {
        clearTimeout(t)
        reject(e)
      }
    )
  })
}

async function apiCall(fn, label, timeoutMs = PER_OP_TIMEOUT_MS) {
  let lastErr
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await withTimeout(fn(), timeoutMs, label)
    } catch (err) {
      lastErr = err
      if (!isNetworkError(err) || attempt === MAX_RETRIES) throw err
      const delay = RETRY_DELAY_MS * attempt
      console.warn(`  [${label}] 网络/超时 (${attempt}/${MAX_RETRIES})，${delay}ms 后重试...`)
      await new Promise((r) => setTimeout(r, delay))
    }
  }
  throw lastErr
}

function loadState() {
  try {
    if (fs.existsSync(STATE_PATH)) {
      return JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'))
    }
  } catch (_) {}
  return {}
}

function saveState(state) {
  try {
    fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8')
  } catch (e) {
    console.warn('写入 state.json 失败:', e.message)
  }
}

async function main() {
  requireEnv()

  const folderArg = process.argv.find((a) => a.startsWith('--folder='))
  const folderRaw = folderArg ? folderArg.slice('--folder='.length) : process.argv[process.argv.indexOf('--folder') + 1]
  if (!folderRaw) {
    console.error('请指定 --folder，例如: node scripts/attach-images.js --folder 01')
    process.exit(1)
  }

  const folder = normalizeFolder(folderRaw)
  const imageDir = path.join(DATA_DIR, folder)
  if (!fs.existsSync(imageDir) || !fs.statSync(imageDir).isDirectory()) {
    console.error('目录不存在或不是文件夹:', imageDir)
    process.exit(1)
  }

  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: '2024-01-01',
    token: TOKEN,
    useCdn: false,
  })

  const state = loadState()

  // 按 image_folder_name 或 _id 查该文件夹对应的产品（只处理一个产品）
  let product
  try {
    product = await apiCall(
      () =>
        client.fetch(
          `*[_type == "product" && (image_folder_name == $folder || _id == $id)][0]{ _id, title, "slug": slug.current }`,
          { folder, id: `product-${folder}` }
        ),
      '查询产品'
    )
  } catch (err) {
    console.error('查询产品失败:', err.message)
    process.exit(1)
  }

  if (!product || !product._id) {
    console.error(`未找到 image_folder_name == "${folder}" 或 _id == "product-${folder}" 的产品，请检查数据或 --folder`)
    process.exit(1)
  }

  const fileNames = listImageFiles(imageDir)
  if (fileNames.length === 0) {
    console.log(`文件夹 ${folder} 下无图片文件，跳过挂图。`)
    saveState({ ...state, lastFolder: folder, lastProductId: product._id })
    return
  }

  console.log(`产品: ${product.title} (_id: ${product._id})，图片数: ${fileNames.length}`)

  const uploadFromFile = async (filePath) => {
    const stream = createReadStream(filePath)
    const asset = await apiCall(
      () =>
        client.assets.upload('image', stream, {
          filename: path.basename(filePath),
        }),
      `上传 ${path.basename(filePath)}`,
      UPLOAD_TIMEOUT_MS
    )
    return asset._id
  }

  const refs = []
  for (const name of fileNames) {
    const fullPath = path.join(imageDir, name)
    const assetId = await uploadFromFile(fullPath)
    refs.push(assetId)
  }

  const firstRef = refs[0]
  const heroImage = { _type: 'image', asset: { _type: 'reference', _ref: firstRef } }
  const galleryImages = refs.map((ref, i) => ({
    _type: 'image',
    asset: { _type: 'reference', _ref: ref },
    _key: `img-${path.basename(fileNames[i])}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  }))
  const gallery = refs.map((ref, i) => ({
    _type: 'image',
    asset: { _type: 'reference', _ref: ref },
    _key: `gal-${path.basename(fileNames[i])}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  }))
  const seoOgImage = { _type: 'image', asset: { _type: 'reference', _ref: firstRef } }

  const patch = client
    .patch(product._id)
    .set({ heroImage })
    .set({ galleryImages })
    .set({ gallery })
    .set({ 'seo.ogImage': seoOgImage })

  await apiCall(() => patch.commit(), `patch ${product._id}`)

  const newState = { ...state, lastFolder: folder, lastProductId: product._id }
  saveState(newState)

  console.log(`完成: heroImage + galleryImages(${galleryImages.length}) + gallery(${gallery.length}) + seo.ogImage 已写入。`)
}

main().catch((e) => {
  if (isNetworkError(e)) {
    console.error('连接 Sanity API 失败，请检查网络/代理，详见 studio/scripts/IMPORT.md。')
  } else {
    console.error(e)
  }
  process.exit(1)
})
