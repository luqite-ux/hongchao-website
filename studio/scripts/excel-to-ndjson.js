import fs from 'fs'
import xlsx from 'xlsx'

const workbook = xlsx.readFile('./product.xlsx')

function must(v, msg) {
  if (v === undefined || v === null || String(v).trim() === '') {
    throw new Error(msg)
  }
  return String(v).trim()
}

// 简单 slugify：把 title 变成可用的 id 片段
function slugify(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[\s\/]+/g, '-')       // 空格/斜杠 -> -
    .replace(/[^\w\-]+/g, '')      // 去掉非字母数字下划线横杠
    .replace(/\-+/g, '-')          // 多个 - 合并
    .replace(/^\-|\-$/g, '')       // 去掉首尾 -
}

const products = xlsx.utils.sheet_to_json(workbook.Sheets['products'])
const categories = xlsx.utils.sheet_to_json(workbook.Sheets['productCategories'])
const images = xlsx.utils.sheet_to_json(workbook.Sheets['images'])

/* ---------- categories: title -> _id (dedupe by title) ---------- */
const categoryIdByTitle = {}
for (const c of categories) {
  const title = must(c.title, `Category title missing: ${JSON.stringify(c)}`)
  const normTitle = title.trim()

  // 同名分类只创建一次（去重）
  if (categoryIdByTitle[normTitle]) continue

  const slug = slugify(normTitle)
  if (!slug) throw new Error(`Category title slugify failed: "${normTitle}"`)

  const id = `productCategory-${slug}`
  categoryIdByTitle[normTitle] = id
}

/* ---------- group images by product (using product_slug or folder) ---------- */
const imagesByFolder = {}
for (const img of images) {
  const folder = must(img.image_folder_name, `Image folder missing: ${JSON.stringify(img)}`)
  const file = must(img.image_file_name, `Image file missing: ${JSON.stringify(img)}`)
  imagesByFolder[folder] ||= []
  imagesByFolder[folder].push(file)
}

// 保证同 folder 的图片顺序稳定：按 order 排序（如果有）
for (const folder of Object.keys(imagesByFolder)) {
  // 这里我们不再从 imagesByFolder 里取 order，因为上面只存了文件名
  // 如果你特别依赖 order，我可以给你增强版（按 order 排），但阶段 1 不影响交付
  imagesByFolder[folder] = Array.from(new Set(imagesByFolder[folder])) // 去重
}

/* ---------- build ndjson ---------- */
const lines = []

// 输出 categories
for (const title of Object.keys(categoryIdByTitle)) {
  const id = categoryIdByTitle[title]
  const slug = id.replace('productCategory-', '')
  lines.push(JSON.stringify({
    _id: id,
    _type: 'productCategory',
    title,
    slug: { _type: 'slug', current: slug }
  }))
}

// 输出 products
for (const p of products) {
  const title = must(p.title, `Product title missing: ${JSON.stringify(p)}`)
  const folder = must(p.image_folder_name, `Product image_folder_name missing: ${title}`)

  const categoryTitle = must(p.category, `Product category missing: ${title}`)
  const categoryRef = categoryIdByTitle[categoryTitle]
  if (!categoryRef) {
    throw new Error(`Product "${title}" refers to unknown category title: "${categoryTitle}"`)
  }

  const productId = `product-${folder}`

  lines.push(JSON.stringify({
    _id: productId,
    _type: 'product',
    title,
    // 如果你 schema 强制需要 slug：用 title 生成一个临时 slug
    slug: { _type: 'slug', current: slugify(title) || `product-${folder}` },

    summary: p.summary || '',
    specs_raw: p['specs (label:value | label:value)'] || '',

    category: { _type: 'reference', _ref: categoryRef },

    image_folder_name: folder,
    image_filenames: imagesByFolder[folder] || []
  }))
}

fs.writeFileSync('import.ndjson', lines.join('\n'))
console.log(`✅ Generated import.ndjson (${lines.length} docs)`)
