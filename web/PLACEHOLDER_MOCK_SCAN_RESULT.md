# 占位/Mock 扫描结果（带路径+片段）

---

## A. 需要改动的文件列表（按优先级）

### P0（必须先改）：影响产品/分类/详情从 Sanity 读取、404 图片、导航菜单结构

| 文件路径 |
|----------|
| `web/app/page.tsx` |
| `web/app/products/page.tsx` |
| `web/app/products/[category]/page.tsx` |
| `web/app/products/[category]/[product]/page.tsx` |
| `web/components/footer.tsx`（底部产品链接与 header 菜单不一致时属 P0） |

### P1（下一步）：about 页占位、通用组件占位

| 文件路径 |
|----------|
| `web/app/about/page.tsx` |
| `web/app/resources/page.tsx` |
| `web/components/application-case.tsx` |
| `web/components/video-demo.tsx` |

### P2（可后改）：样式微调、文案

| 文件路径 |
|----------|
| `web/components/header.tsx`（仅 logo 兜底，已有 Sanity） |
| `web/components/footer.tsx`（仅 logo 兜底时属 P2） |

---

## B. 每个文件的占位/假数据定位

---

### 文件路径：`web/app/page.tsx`

**1**

- **片段（行 6–42）：**
```ts
const products = [
  {
    title: "Vibratory Bowl Feeder",
    positioning: "Custom-designed bowl feeders for precise part sorting and orientation",
    advantage: "Handles screws, springs, metal and plastic components",
    href: "/products/vibratory-bowl-feeder",
    slug: "vibratory-bowl-feeder",
  },
  // ... 共 5 个产品
]
```
- **问题类型：** mock-data, missing-sanity-fetch

**2**

- **片段（行 43–48）：**
```ts
const stats = [
  { value: "2005", label: "Founded" },
  { value: "16+", label: "Patents Filed" },
  { value: "1000+", label: "Projects Delivered" },
  { value: "50+", label: "Countries Served" },
]
```
- **问题类型：** mock-data

**3**

- **片段（行 50–71）：**
```ts
const features = [
  { icon: Settings, title: "Custom Engineering", description: "..." },
  // ... 共 4 条
]
```
- **问题类型：** mock-data

**4**

- **片段（行 263–272）：**
```ts
<div className="aspect-[4/3] bg-[#F5F5F5] relative overflow-hidden">
  <Image
    src={`/images/products/${product.slug}/system-01.jpg`}
    alt={product.title}
    fill
```
- **问题类型：** static-image-path

**5**

- **片段（行 306–314）：**
```ts
<div className="aspect-[4/3] md:aspect-auto bg-[#F5F5F5] relative overflow-hidden">
  <Image
    src={`/images/products/${products[4].slug}/system-01.jpg`}
    alt={products[4].title}
    fill
```
- **问题类型：** static-image-path

**6**

- **片段（行 448–456）：**
```ts
<div className="aspect-[4/3] relative overflow-hidden border border-white/10">
  <Image
    src="/images/products/vibratory-bowl-feeder/application-01.jpg"
    alt="Automotive fastener feeding system"
    fill
```
- **问题类型：** static-image-path

**7**

- **片段（行 363–371）：**
```ts
{[
  "8 Invention Patents + 8 Utility Model Patents",
  "Custom non-standard automation solutions",
  "Strategic partnerships with leading manufacturers",
  "Comprehensive after-sales support",
].map((item) => (
```
- **问题类型：** mock-data

---

### 文件路径：`web/app/products/page.tsx`

**1**

- **片段（行 12–47）：**
```ts
const productCategories = [
  {
    title: "Vibratory Bowl Feeder",
    slug: "vibratory-bowl-feeder",
    description: "Custom-designed bowl feeders used for precise part sorting...",
    features: ["Custom bowl tooling", "Linear track feeders", ...],
    applications: ["Small parts assembly", "Fastener feeding", ...],
  },
  // ... 共 5 个分类
]
```
- **问题类型：** mock-data, missing-sanity-fetch

**2**

- **片段（行 48–65）：**
```ts
const capabilities = [
  { icon: Settings, title: "Custom Engineering", description: "..." },
  { icon: Zap, title: "Rapid Prototyping", description: "..." },
  { icon: Factory, title: "Full Integration", description: "..." },
]
```
- **问题类型：** mock-data

**3**

- **片段（行 138–142）：**
```ts
<div className={`aspect-[16/10] lg:aspect-auto bg-secondary flex items-center justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
  <Factory className="h-32 w-32 text-primary/30" />
</div>
```
- **问题类型：** placeholder-image（无真实图，用 Factory 图标占位）

---

### 文件路径：`web/app/products/[category]/page.tsx`

**1**

- **片段（行 8–75）：**
```ts
const categoryData: Record<string, {
  title: string
  tagline: string
  valueProposition: string
  systems: { name: string; slug: string; partType: string; advantage: string }[]
  capabilities: { title: string; description: string }[]
  applications: string[]
  specifications: { parameter: string; range: string }[]
  faqs: { question: string; answer: string }[]
}> = {
  "vibratory-bowl-feeder": {
    title: "Vibratory Bowl Feeder",
    tagline: "Precise part sorting and orientation systems",
    valueProposition: "...",
    systems: [ { name: "Standard Bowl Feeder System", slug: "standard-bowl-feeder", ... }, ... ],
    capabilities: [ ... ],
    applications: [ ... ],
    specifications: [ ... ],
    faqs: [ ... ],
  },
  "centrifugal-feeder": { ... },
  // ... 共 5 个 slug 对应整块数据
}
```
- **问题类型：** mock-data, missing-sanity-fetch

**2**

- **片段（行 240–244、258–264）：**
```ts
const data = categoryData[category]
// ...
export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const data = categoryData[category]
  if (!data) {
    notFound()
  }
```
- **问题类型：** missing-sanity-fetch（分类数据来自本地对象，非 Sanity）

**3**

- **片段（行 303–314）：**
```ts
<div className="aspect-[4/3] relative overflow-hidden border border-white/10">
  <Image
    src={`/images/products/${category}/system-01.jpg`}
    alt={data.title}
    fill
    className="object-cover"
    sizes="(max-width: 1024px) 100vw, 50vw"
    priority
  />
</div>
```
- **问题类型：** static-image-path

**4**

- **片段（行 344–353）：**
```ts
<div className="aspect-[4/3] bg-[#F5F5F5] relative overflow-hidden">
  <Image
    src={`/images/products/${category}/${system.slug}.jpg`}
    alt={system.name}
    fill
```
- **问题类型：** static-image-path

**5**

- **片段（行 436–444）：**
```ts
<div className="aspect-[4/3] relative overflow-hidden border border-[#E5E5E5]">
  <Image
    src={`/images/products/${category}/application-01.jpg`}
    alt={`${data.title} application`}
    fill
```
- **问题类型：** static-image-path

---

### 文件路径：`web/app/products/[category]/[product]/page.tsx`

**1**

- **片段（行 68–78）：**
```ts
<div className="aspect-[4/3] relative overflow-hidden border border-[#E5E5E5] bg-[#F5F5F5]">
  <Image
    src={`/images/products/${category}/${product}.jpg`}
    alt={productName}
    fill
    className="object-cover"
    sizes="(max-width: 1024px) 100vw, 50vw"
    priority
  />
</div>
```
- **问题类型：** static-image-path, missing-sanity-fetch

**2**

- **片段（行 81–94）：**
```ts
{[1, 2, 3, 4].map((i) => (
  <div key={i} className="aspect-square relative overflow-hidden ...">
    <Image
      src={`/images/products/${category}/${product}-0${i}.jpg`}
      alt={`${productName} view ${i}`}
      fill
```
- **问题类型：** static-image-path

**3**

- **片段（行 306–322）：**
```ts
{[
  { name: "Sound Enclosure", slug: "sound-enclosure" },
  { name: "Hopper System", slug: "hopper-system" },
  { name: "Linear Track Feeder", slug: "linear-track-feeder" },
].map((related) => (
  <Link key={related.slug} href={`/products/${category}/${related.slug}`} ...>
    <div className="aspect-[4/3] relative overflow-hidden bg-[#F5F5F5]">
      <Image
        src={`/images/products/${category}/${related.slug}.jpg`}
```
- **问题类型：** mock-data, static-image-path

**4**

- **说明：** 整页无 `sanityClient.fetch`，标题/描述由 `category`/`product` slug 转成 name 显示，无 product 文档。
- **问题类型：** missing-sanity-fetch

---

### 文件路径：`web/app/about/page.tsx`

**1**

- **片段（行 52–55）：**
```ts
const logoSrc = settings?.logo ? urlForImage(settings.logo).width(300).height(300).url() : "/logo.png"
```
- **问题类型：** placeholder-image（兜底静态图）

**2**

- **片段（行 19–23）：**
```ts
const milestones = [
  { year: "2005", event: "Company founded in Suzhou, China" },
  { year: "Present", event: "16 patents accepted (8 invention + 8 utility model)" },
]
```
- **问题类型：** mock-data

**3**

- **片段（行 25–46）：**
```ts
const values = [
  { icon: Target, title: "Customer Focus", description: "..." },
  { icon: Award, title: "Quality Excellence", description: "..." },
  { icon: Factory, title: "Innovation", description: "..." },
  { icon: Globe, title: "Global Partnership", description: "..." },
]
```
- **问题类型：** mock-data

**4**

- **片段（行 48–50）：**
```ts
const certifications = [
  "16 Patents (8 Invention + 8 Utility Model)",
]
```
- **问题类型：** mock-data

**5**

- **片段（行 244–261）：**
```ts
{[
  "5,000+ sqm manufacturing facility",
  "Advanced CNC machining centers",
  "In-house tooling design and fabrication",
  "Complete testing and validation lab",
  "Experienced engineering team",
].map((item) => (
  <div key={item} className="flex items-center gap-3">
    <CheckCircle className="h-5 w-5 text-primary" />
    <span className="text-background/80">{item}</span>
  </div>
))}
```
- **问题类型：** mock-data

**6**

- **片段（行 258–260）：**
```ts
<div className="aspect-[4/3] bg-background/10 rounded-lg flex items-center justify-center">
  <Users className="h-32 w-32 text-primary/30" />
</div>
```
- **问题类型：** placeholder-image（无图，用 Users 图标）

---

### 文件路径：`web/app/resources/page.tsx`

**1**

- **片段（行 13–37）：**
```ts
const featuredResources = [
  { type: "Guide", icon: BookOpen, title: "Complete Guide to Vibratory Bowl Feeder Selection", description: "...", slug: "vibratory-bowl-feeder-selection-guide", readTime: "15 min read" },
  // ... 3 条
]
```
- **问题类型：** mock-data, missing-sanity-fetch

**2**

- **片段（行 39–75）：**
```ts
const articles = [
  { title: "Understanding Vibratory Feeder Frequency Control", category: "Technical", slug: "...", readTime: "6 min read" },
  // ... 6 条
]
```
- **问题类型：** mock-data

**3**

- **片段（行 77–102）：**
```ts
const downloads = [
  { title: "Product Catalog 2025", description: "...", type: "PDF", size: "12.5 MB" },
  // ... 4 条
]
```
- **问题类型：** mock-data

**4**

- **片段（行 104–119）：**
```ts
const videos = [
  { title: "Bowl Feeder Operation Overview", duration: "4:32", thumbnail: "bowl-feeder-video" },
  { title: "Flexible Feeder Demo", duration: "6:15", thumbnail: "flexible-feeder-video" },
  { title: "Factory Tour", duration: "8:45", thumbnail: "factory-tour-video" },
]
```
- **问题类型：** mock-data；thumbnail 为占位 key，非真实路径（placeholder-image 语义）

---

### 文件路径：`web/components/application-case.tsx`

**1**

- **片段（行 9–12）：**
```ts
export function ApplicationCase({ 
  imagePath = "/images/products/vibratory-bowl-feeder/application-01.jpg" 
}: ApplicationCaseProps) {
```
- **问题类型：** static-image-path

**2**

- **片段（行 69–74）：**
```ts
<Image
  src={imagePath || "/placeholder.svg"}
  alt="Automotive fastener feeding system application"
  fill
  className="object-cover"
```
- **问题类型：** placeholder-image（无图时兜底 `/placeholder.svg`）

---

### 文件路径：`web/components/video-demo.tsx`

**1**

- **片段（行 16–24）：**
```ts
export function VideoDemo({
  title,
  description,
  partType,
  feedingBehavior,
  applicationContext,
  thumbnailPath = "/images/video-placeholder.jpg",
  videoId,
}: VideoDemoProps) {
```
- **问题类型：** placeholder-image（默认占位图路径；组件内未渲染 thumbnailPath，仅占位语义）

---

### 文件路径：`web/components/header.tsx`

**1**

- **片段（行 40–44）：**
```ts
const logoSrc = settings?.logo
  ? urlForImage(settings.logo).width(256).height(256).url()
  : "/logo.png"
```
- **问题类型：** placeholder-image（无 Sanity logo 时兜底）

---

### 文件路径：`web/components/footer.tsx`

**1**

- **片段（行 8–25）：**
```ts
const footerNavigation = {
  products: [
    { name: "Vibratory Bowl Feeder", href: "/products/vibratory-bowl-feeder" },
    { name: "Centrifugal Feeder", href: "/products/centrifugal-feeder" },
    { name: "Step Feeder", href: "/products/step-feeder" },
    { name: "Elevator Hopper", href: "/products/elevator-hopper" },
    { name: "Auxiliary Equipment", href: "/products/auxiliary-equipment" },
  ],
  company: [ ... ],
  support: [ ... ],
}
```
- **问题类型：** hardcoded-menu

**2**

- **片段（行 34–38）：**
```ts
const footerLogoUrl = settings?.logo
  ? urlForImage(settings.logo).width(180).url()
  : "/logo.png"
```
- **问题类型：** placeholder-image（兜底）

---

## C. 修复建议（每类 1–2 句）

- **首页 `web/app/page.tsx`**  
  从 Sanity 读：product 列表（带 `category` 引用、`heroImage` 或主图字段）。图片用现有 `urlForImage()`（`lib/sanity.image.ts` 里是 `createImageUrlBuilder(sanityClient)`），例如 `urlForImage(product.heroImage).width(800).height(600).url()`；无图再兜底静态路径或占位图。stats/features 可放进 siteSettings 或独立 document，再 fetch 渲染。

- **产品总览 `web/app/products/page.tsx`**  
  分类列表改为使用已有 `fetchProductCategories()`；若 productCategory 有主图字段，用 `urlForImage(category.image)` 替代 Factory 图标，无图再保留图标或占位图。capabilities 可迁到 siteSettings 或独立文档。

- **分类页 `web/app/products/[category]/page.tsx`**  
  新增 GROQ：按 `slug.current == $slug` 查 `productCategory`，并拉取该分类下 products（引用 category 的 product 列表）。页面改为 async，fetch 该 category + products；Hero/系统卡片/应用图用 product 或 category 的 Sanity 图片字段 + `urlForImage()`，无图再兜底。

- **产品详情 `web/app/products/[category]/[product]/page.tsx`**  
  新增 GROQ：按 category slug + product slug 查单条 `product`（含 `heroImage`、`galleryImages` 等）。主图用 `urlForImage(product.heroImage)`，图集用 `urlForImage(item)` 遍历。Related 改为同分类下其他 products 的 GROQ 或 Sanity 的 related 引用，图片同样用 `urlForImage()`。

- **关于页 `web/app/about/page.tsx`**  
  milestones、values、certifications、Team 列表等迁到 Sanity（如 aboutPage 或 siteSettings 的 block/数组）。logo 兜底保留 `/logo.png`。Team 区块若有图，用 Sanity 图字段 + `urlForImage()`，无图可保留 Users 图标。

- **资源页 `web/app/resources/page.tsx`**  
  若资源/文章/视频由 CMS 管理：在 Sanity 建 resource/article/video 类型，本页 fetch 列表；视频 thumbnail 用 Sanity 图或 URL 字段，避免仅用占位 key。

- **`application-case.tsx`**  
  调用方传入 Sanity 图片 URL（如 `urlForImage(caseStudy.image).url()`）；默认值可改为 `undefined`，无图时 `src={imagePath || "/placeholder.svg"}` 保留。

- **`video-demo.tsx`**  
  调用方传入真实 thumbnail URL；无图时保留默认 `"/images/video-placeholder.jpg"` 或统一占位图。若在 UI 中展示缩略图，用 `thumbnailPath` 作为 `<Image src={thumbnailPath} />`。

- **`header.tsx` / `footer.tsx`**  
  logo 继续用 `urlForImage(settings.logo)...`，无则 `/logo.png`。footer 的 `footerNavigation.products` 改为基于 `fetchProductCategories()` 动态生成（与 header 产品菜单一致），company/support 可迁到 siteSettings 或保留硬编码。

---

## D. 当前 Sanity fetch 入口

- **Client 文件路径：**  
  `web/lib/sanity.client.ts`  
  - 使用 `createClient` from `next-sanity`，导出 `sanityClient`；projectId/dataset/apiVersion 来自 `NEXT_PUBLIC_*` 环境变量。

- **GROQ query 文件与写法：**  
  `web/lib/sanity.queries.ts`  
  - `siteSettingsQuery`：`*[_type == "siteSettings"][0]{ companyName, logo, contact{ phone, email, address, wechat }, defaultSeo{ title, description, ogImage } }`  
  - `productCategoriesQuery`：`*[_type == "productCategory"] | order(title asc) { _id, title, "slug": slug.current, description }`  
  - 无 product、无 category 详情、无 about/resources 等 query。

- **调用 fetch 的页面/位置：**  
  - `web/app/layout.tsx`：`fetchSiteSettings()`、`fetchProductCategories()`，把 settings 和 productCategories 传给 Header/Footer。  
  - `web/app/about/page.tsx`：仅 `fetchSiteSettings()`。  
  - `web/app/contact/page.tsx`：仅 `fetchSiteSettings()`。  
  - `web/app/api/sanity-check/route.ts`：`sanityClient.fetch(siteSettingsQuery)`。

- **完全未 fetch、仍用 mock 的页面：**  
  - `web/app/page.tsx`（首页）  
  - `web/app/products/page.tsx`（产品总览）  
  - `web/app/products/[category]/page.tsx`（分类页）  
  - `web/app/products/[category]/[product]/page.tsx`（产品详情）  
  - `web/app/resources/page.tsx`（资源页）  
  以上均无 `sanityClient.fetch` 产品/分类详情/资源，数据全部来自页面内硬编码或静态路径。
