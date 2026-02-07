/**
 * 从 Excel + 本地图片批量导入产品与分类到 Sanity（幂等 upsert）
 * 运行：pnpm import:excel（在 studio 目录下）
 */
import { createClient } from '@sanity/client'
import * as XLSX from 'xlsx'
import slugify from 'slugify'
import fs from 'fs'
import path from 'path'
import { createReadStream } from 'fs' // used for client.assets.upload

// 加载 studio/.env.local（不提交 token）
function loadEnv(): void {
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

function requireEnv(): void {
  const missing: string[] = []
  if (!PROJECT_ID) missing.push('SANITY_PROJECT_ID 或 SANITY_STUDIO_PROJECT_ID')
  if (!DATASET) missing.push('SANITY_DATASET 或 SANITY_STUDIO_DATASET')
  if (!TOKEN) missing.push('SANITY_WRITE_TOKEN')
  if (missing.length > 0) {
    console.error('缺少环境变量，请在 studio/.env.local 中配置：')
    missing.forEach((m) => console.error('  -', m))
    process.exit(1)
  }
}

/** 将 image_folder_name 统一为两位 "01".."99" */
function normalizeFolderName(name: string | number | undefined): string {
  if (name === undefined || name === null || name === '') return ''
  const s = String(name).trim()
  const n = parseInt(s, 10)
  if (Number.isNaN(n)) return s
  return n >= 0 && n <= 99 ? n.toString().padStart(2, '0') : s
}

/** 用 title 生成 slug（lowercase + strict） */
function toSlug(title: string): string {
  return slugify(title, { lower: true, strict: true })
}

const DATA_DIR = path.resolve(process.cwd(), 'data')
const EXCEL_PATH = path.resolve(DATA_DIR, 'product.xlsx')

/** 请求超时（毫秒） */
const REQUEST_TIMEOUT = 120_000
/** 单次 API 调用超时（fetch/create/patch） */
const PER_OP_TIMEOUT_MS = 90_000
/** 单张图片上传超时 */
const UPLOAD_OP_TIMEOUT_MS = 120_000
/** 网络错误时重试次数 */
const MAX_RETRIES = 4
/** 重试间隔基数（毫秒） */
const RETRY_DELAY_MS = 2500
/** 每导入完一个产品后等待（毫秒），避免 socket 复用卡死 */
const DELAY_BETWEEN_PRODUCTS_MS = 1500

function isNetworkError(err: unknown): boolean {
  const code = err && typeof err === 'object' && 'code' in err ? (err as { code: string }).code : ''
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

/** 带超时的 Promise，超时后拒绝 */
function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => {
      reject(new Error(`${label} 超时 (${ms}ms)`))
    }, ms)
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

/** 带超时 + 网络错误重试的 API 调用（用于 fetch/create/patch/upload） */
async function apiCall<T>(
  fn: () => Promise<T>,
  label: string,
  timeoutMs: number = PER_OP_TIMEOUT_MS
): Promise<T> {
  let lastErr: unknown
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

/** 兼容旧逻辑的 withRetry（仅用于初始化时的 fetch） */
async function withRetry<T>(fn: () => Promise<T>, label: string): Promise<T> {
  return apiCall(fn, label, REQUEST_TIMEOUT)
}

/** 捕获网络错误并输出简短提示（避免在日志中打印含 token 的 request），然后退出 */
function wrapNetworkError(err: unknown, context: string): never {
  if (isNetworkError(err)) {
    const code = err && typeof err === 'object' && 'code' in err ? (err as { code: string }).code : ''
    console.error(
      `[${context}] 连接 Sanity API 失败 (${code || 'network'})。请检查：\n` +
        '  1. 本机/公司网络是否可访问 api.sanity.io（或需配置代理/VPN）\n' +
        '  2. 环境变量 HTTPS_PROXY/HTTP_PROXY 是否已设置（若需代理）\n' +
        '  3. 详见 studio/scripts/IMPORT.md 的「连接超时」说明'
    )
    process.exit(1)
  }
  throw err
}

type Row = Record<string, unknown>

/** 从行对象中按多种可能列名取值（兼容 Excel 表头带 * 或括号说明，如 title*、specs (label:value...)） */
function getCell(row: Row, ...candidateKeys: string[]): unknown {
  for (const key of candidateKeys) {
    const v = row[key]
    if (v !== undefined && v !== null && v !== '') return v
  }
  const primary = candidateKeys[0].toLowerCase().replace(/_/g, '')
  for (const k of Object.keys(row)) {
    const v = row[k]
    if (v === undefined || v === null || v === '') continue
    const kNorm = k.replace(/\s*\([^)]*\)\s*$/, '').replace(/\*+$/, '').trim().toLowerCase().replace(/_/g, '')
    if (kNorm === primary) return v
    if (k.toLowerCase().replace(/_/g, '').startsWith(primary)) return v
  }
  return undefined
}

function getSheetRows(workbook: XLSX.WorkBook, sheetName: string): Row[] {
  const sheet = workbook.Sheets[sheetName]
  if (!sheet) return []
  return (XLSX.utils.sheet_to_json(sheet) as Row[]) || []
}

/** 解析 specs 每行 "label:value" -> [{ label, value }] */
function parseSpecs(specsStr: string | undefined): { label: string; value: string }[] {
  if (!specsStr || typeof specsStr !== 'string') return []
  return specsStr
    .split(/\r?\n/)
    .map((line) => {
      const idx = line.indexOf(':')
      if (idx < 0) return { label: line.trim(), value: '' }
      return { label: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() }
    })
    .filter((s) => s.label || s.value)
}

/** 解析 faq 每行 "Q:A" -> [{ question, answer }] */
function parseFaq(faqStr: string | undefined): { question: string; answer: string }[] {
  if (!faqStr || typeof faqStr !== 'string') return []
  return faqStr
    .split(/\r?\n/)
    .map((line) => {
      const idx = line.indexOf(':')
      if (idx < 0) return { question: line.trim(), answer: '' }
      return { question: line.slice(0, idx).trim(), answer: line.slice(idx + 1).trim() }
    })
    .filter((f) => f.question || f.answer)
}

/** 按 image_folder_name 获取该文件夹下所有图片行（padStart 2 位后比较），按 order 升序再按 filename */
function getImageRowsByFolder(
  imageRows: Row[],
  folderName: string
): { filename: string; order: number; type: string }[] {
  if (!folderName) return []
  const norm = (s: unknown) => normalizeFolderName(s as string)
  const rows = imageRows.filter(
    (r) => norm(r.image_folder_name ?? r.folder ?? r.image_folder) === folderName
  )
  return rows
    .map((r) => ({
      filename: String(r.image_file_name ?? r.filename ?? r.file ?? r.name ?? '').trim(),
      order: typeof r.order === 'number' ? r.order : parseInt(String(r.order ?? 0), 10),
      type: String(r.type ?? 'gallery').trim().toLowerCase(),
    }))
    .filter((r) => r.filename)
    .sort((a, b) => a.order - b.order || a.filename.localeCompare(b.filename))
}

/** 从目录按文件名排序列出图片文件（仅常见图片扩展名） */
const IMAGE_EXT = new Set(
  ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'].map((e) => e.toLowerCase())
)
function listImageFiles(dir: string): string[] {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return []
  return fs
    .readdirSync(dir)
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
}

async function main(): Promise<void> {
  requireEnv()

  const client = createClient({
    projectId: PROJECT_ID!,
    dataset: DATASET!,
    apiVersion: '2024-01-01',
    token: TOKEN!,
    useCdn: false,
    timeout: REQUEST_TIMEOUT,
  })

  if (!fs.existsSync(EXCEL_PATH)) {
    console.error('Excel 文件不存在:', EXCEL_PATH)
    process.exit(1)
  }

  const workbook = XLSX.readFile(EXCEL_PATH)
  const productCategoriesRows = getSheetRows(workbook, 'productCategories')
  const productsRows = getSheetRows(workbook, 'products')
  const imagesRows = getSheetRows(workbook, 'images')

  // 幂等：先查已有分类与产品（按 slug.current），网络错误时重试
  let existingCategories: { _id: string; 'slug.current': string }[]
  let existingProducts: { _id: string; 'slug.current': string }[]
  try {
    existingCategories = await withRetry(
      () =>
        client.fetch<
          { _id: string; 'slug.current': string }[]
        >(`*[_type == "productCategory"]{ _id, "slug.current": slug.current }`),
      '查询分类'
    )
    existingProducts = await withRetry(
      () =>
        client.fetch<
          { _id: string; 'slug.current': string }[]
        >(`*[_type == "product"]{ _id, "slug.current": slug.current }`),
      '查询产品'
    )
  } catch (err) {
    wrapNetworkError(err, '初始化')
  }

  const slugToCategoryId = new Map<string, string>()
  for (const c of existingCategories) {
    const cur = c['slug.current']
    if (cur) slugToCategoryId.set(cur, c._id)
  }
  const slugToProductId = new Map<string, string>()
  for (const p of existingProducts) {
    const cur = p['slug.current']
    if (cur) slugToProductId.set(cur, p._id)
  }

  // Upsert productCategories
  let categoryCreated = 0
  for (const row of productCategoriesRows) {
    const title = String(getCell(row, 'title', 'title*') ?? '').trim()
    if (!title) continue
    const slugRaw = getCell(row, 'slug', 'slug_current')
    const slugCurrent = slugRaw ? String(slugRaw).trim() : toSlug(title)
    if (!slugCurrent) continue

    if (slugToCategoryId.has(slugCurrent)) continue
    const id = `productCategory.${slugCurrent}`
    const desc = getCell(row, 'description')
    await apiCall(
      () =>
        client.createOrReplace({
          _id: id,
          _type: 'productCategory',
          title,
          slug: { _type: 'slug', current: slugCurrent },
          description: desc != null && desc !== '' ? String(desc) : undefined,
        }),
      `分类 ${slugCurrent}`
    )
    slugToCategoryId.set(slugCurrent, id)
    categoryCreated++
  }
  console.log(`分类：共 ${productCategoriesRows.length} 行，本次新建 ${categoryCreated} 个。`)

  let productOk = 0
  let productFail = 0
  let productSkip = 0

  const totalProducts = productsRows.length
  console.log(`开始导入产品，共 ${totalProducts} 条（串行、带超时与重试）`)

  for (let idx = 0; idx < productsRows.length; idx++) {
    const row = productsRows[idx]
    const progress = `[${idx + 1}/${totalProducts}]`
    const title = String(getCell(row, 'title', 'title*') ?? '').trim().replace(/\r?\n/g, ' ')
    if (!title) {
      productSkip++
      console.warn(`${progress} 跳过（无 title）`)
      continue
    }
    const slugRaw = getCell(row, 'slug', 'slug_current')
    const slugCurrent = slugRaw ? String(slugRaw).trim() : toSlug(title)
    if (!slugCurrent) {
      productSkip++
      console.warn(`${progress} 跳过（无 slug）: ${title}`)
      continue
    }

    console.log(`${progress} 正在导入: ${title}`)

    const categoryRef = String(getCell(row, 'category', 'category_slug') ?? '').trim()
    const categoryId = categoryRef
      ? slugToCategoryId.get(categoryRef) ?? slugToCategoryId.get(toSlug(categoryRef))
      : undefined

    const folderRaw = getCell(row, 'image_folder_name', 'image_folder_name*', 'image_folder', 'folder')
    const folderName = normalizeFolderName(folderRaw as string)
    const imageDir = folderName ? path.join(DATA_DIR, folderName) : ''

    try {
      let heroRef: { _type: 'image'; asset: { _type: 'reference'; _ref: string } } | undefined
      const galleryRefs: { _type: 'image'; asset: { _type: 'reference'; _ref: string }; _key: string }[] = []

      if (imageDir) {
        const imageRowsForProduct = getImageRowsByFolder(imagesRows, folderName)
        let heroPath: string | null = null
        const galleryPaths: string[] = []

        if (imageRowsForProduct.length > 0) {
          const heroCandidates = imageRowsForProduct.filter((r) => r.type === 'hero')
          const galleryCandidates = imageRowsForProduct.filter((r) => r.type === 'gallery')
          const firstHero = heroCandidates[0]
          if (firstHero) {
            const p = path.join(imageDir, firstHero.filename)
            if (fs.existsSync(p)) heroPath = p
          }
          for (const r of galleryCandidates) {
            const filePath = path.join(imageDir, r.filename)
            if (fs.existsSync(filePath)) galleryPaths.push(filePath)
          }
          if (!heroPath && galleryPaths.length > 0) {
            heroPath = galleryPaths.shift() ?? null
          }
        } else {
          const files = listImageFiles(imageDir)
          if (files.length > 0) {
            heroPath = path.join(imageDir, files[0])
            for (let i = 1; i < files.length; i++) {
              galleryPaths.push(path.join(imageDir, files[i]))
            }
          }
        }

        if (!heroPath && galleryPaths.length === 0) {
          console.warn(`  ${progress} 无图片（folder=${folderName}），继续导入无图产品`)
        }

        const uploadAsset = async (filePath: string): Promise<string> => {
          const stream = createReadStream(filePath)
          const asset = await apiCall(
            () =>
              client.assets.upload('image', stream, {
                filename: path.basename(filePath),
              }),
            `上传 ${path.basename(filePath)}`,
            UPLOAD_OP_TIMEOUT_MS
          )
          return asset._id
        }

        if (heroPath) {
          const ref = await uploadAsset(heroPath)
          heroRef = { _type: 'image', asset: { _type: 'reference', _ref: ref } }
        }
        for (const p of galleryPaths) {
          const ref = await uploadAsset(p)
          galleryRefs.push({
            _type: 'image',
            asset: { _type: 'reference', _ref: ref },
            _key: `img-${path.basename(p)}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          })
        }
      }

      const id = slugToProductId.get(slugCurrent) ?? `product.${slugCurrent}`
      const exists = slugToProductId.has(slugCurrent)

      if (exists) {
        const patch = client.patch(id)
          .set({ title })
          .set({ slug: { _type: 'slug', current: slugCurrent } })
        if (categoryId) patch.set({ category: { _type: 'reference', _ref: categoryId } })
        const summaryVal = getCell(row, 'summary')
        if (summaryVal != null && summaryVal !== '') patch.set({ summary: String(summaryVal) })
        patch.set({ specs: parseSpecs(getCell(row, 'specs') as string) })
        patch.set({ faq: parseFaq(getCell(row, 'faq') as string) })
        if (heroRef) patch.set({ heroImage: heroRef })
        if (galleryRefs.length > 0) patch.set({ galleryImages: galleryRefs })
        await apiCall(() => patch.commit(), `patch ${slugCurrent}`)
      } else {
        const summaryVal = getCell(row, 'summary')
        const doc = {
          _id: id,
          _type: 'product' as const,
          title,
          slug: { _type: 'slug' as const, current: slugCurrent },
          ...(categoryId && { category: { _type: 'reference' as const, _ref: categoryId } }),
          ...(summaryVal != null && summaryVal !== '' && { summary: String(summaryVal) }),
          specs: parseSpecs(getCell(row, 'specs') as string),
          faq: parseFaq(getCell(row, 'faq') as string),
          ...(heroRef && { heroImage: heroRef }),
          ...(galleryRefs.length > 0 && { galleryImages: galleryRefs }),
        }
        await apiCall(() => client.create(doc), `create ${slugCurrent}`)
        slugToProductId.set(slugCurrent, id)
      }

      const imgCount = (heroRef ? 1 : 0) + galleryRefs.length
      console.log(`  ${progress} 成功 | 图片数=${imgCount}`)
      productOk++
    } catch (err) {
      productFail++
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  ${progress} 失败 | ${msg}`)
    }

    if (idx < productsRows.length - 1 && DELAY_BETWEEN_PRODUCTS_MS > 0) {
      await new Promise((r) => setTimeout(r, DELAY_BETWEEN_PRODUCTS_MS))
    }
  }

  console.log(
    `\n产品导入汇总: 成功 ${productOk}，失败 ${productFail}，跳过 ${productSkip}`
  )
}

main().catch((e) => {
  if (isNetworkError(e)) {
    const code = e && typeof e === 'object' && 'code' in e ? (e as { code: string }).code : ''
    console.error(
      `连接 Sanity API 失败 (${code || 'network'})。请检查网络/代理/VPN，详见 studio/scripts/IMPORT.md。`
    )
  } else {
    console.error(e)
  }
  process.exit(1)
})
