# 占位内容与 Mock 数据审计清单

扫描范围：Next.js App Router（`web/`）。  
说明：表单 input 的 `placeholder` 属性（如 "John"、"Select inquiry type"）视为正常表单 UX，不列入“占位内容”改动清单。

---

## 一、Sanity 数据入口（当前状态）

| 入口 | 文件 | 说明 |
|------|------|------|
| **Client** | `lib/sanity.client.ts` | `createClient` from next-sanity，导出 `sanityClient` |
| **Queries** | `lib/sanity.queries.ts` | 仅含 `siteSettingsQuery`、`productCategoriesQuery`，**无 product 相关 GROQ** |
| **Fetch 方法** | `lib/site-settings.ts` | `fetchSiteSettings()`，用 `siteSettingsQuery` |
| **Fetch 方法** | `lib/product-categories.ts` | `fetchProductCategories()`，用 `productCategoriesQuery` |
| **API** | `app/api/sanity-check/route.ts` | 用 `sanityClient.fetch(siteSettingsQuery)` 做健康检查 |

结论：**产品列表、分类详情、单品详情、资源/视频等均未接 Sanity**，全部来自页面内硬编码或静态路径。

---

## 二、需要改动的文件列表（按优先级）

### 高优先级（直接影响产品/分类展示与 SEO）

1. **`app/page.tsx`** — 首页：产品列表 + 本地图片路径
2. **`app/products/page.tsx`** — 产品总览：分类列表 + Factory 占位图
3. **`app/products/[category]/page.tsx`** — 分类页：整页 `categoryData` + 本地图片
4. **`app/products/[category]/[product]/page.tsx`** — 产品详情：本地图片 + 硬编码 Related

### 中优先级（关于页、资源页、组件占位）

5. **`app/about/page.tsx`** — 关于页：硬编码文案与 logo 兜底
6. **`app/resources/page.tsx`** — 资源页：全部 mock 数据 + 视频 thumbnail 占位
7. **`components/application-case.tsx`** — 应用案例：默认本地图 + placeholder.svg 兜底
8. **`components/video-demo.tsx`** — 视频组件：默认 video-placeholder 图

### 低优先级（全局兜底，可保留）

9. **`components/header.tsx`** — 无 Sanity logo 时用 `/logo.png`
10. **`components/footer.tsx`** — 同上 + 底部产品链接为硬编码数组

---

## 三、各文件占位/假数据位置与修复建议

### 1. `app/page.tsx`

| 类型 | 位置（行号或片段） | 说明 |
|------|---------------------|------|
| **硬编码数组** | 第 6–41 行 | `products`：5 个产品（title, positioning, advantage, href, slug） |
| **硬编码数组** | 第 43–48 行 | `stats`：Founded/Patents/Projects/Countries |
| **硬编码数组** | 第 50–71 行 | `features`：4 条（icon, title, description） |
| **占位图片** | 第 267 行 | `src={\`/images/products/${product.slug}/system-01.jpg\`}`（前 4 个产品） |
| **占位图片** | 第 310 行 | `src={\`/images/products/${products[4].slug}/system-01.jpg\`}`（第 5 个产品） |
| **占位图片** | 第 453 行 | `src="/images/products/vibratory-bowl-feeder/application-01.jpg"`（Application Case 区块） |
| **硬编码列表** | 第 363–368 行 | “Why HONGCHAO” 下 4 条 bullet 文案 |

**建议**：在 `sanity.queries.ts` 增加首页用 GROQ（如带 `heroImage`/主图字段的 product 列表）；本页改为 `async`，`fetch` 产品与分类，用 `urlForImage(product.heroImage)` 等替代 `/images/products/...`；stats/features 可迁到 Sanity（如 siteSettings 或独立 document）。

---

### 2. `app/products/page.tsx`

| 类型 | 位置（行号或片段） | 说明 |
|------|---------------------|------|
| **硬编码数组** | 第 12–46 行 | `productCategories`：5 个分类（title, slug, description, features[], applications[]） |
| **硬编码数组** | 第 48–65 行 | `capabilities`：3 条（icon, title, description） |
| **占位图** | 第 141 行 | `<Factory className="h-32 w-32 text-primary/30" />` 作分类卡片图（无真实图片） |

**建议**：分类列表改为使用 `fetchProductCategories()`；若 Sanity 的 productCategory 有图字段，用其替代 Factory 图标；capabilities 可迁到 siteSettings 或独立文档。

---

### 3. `app/products/[category]/page.tsx`

| 类型 | 位置（行号或片段） | 说明 |
|------|---------------------|------|
| **硬编码大对象** | 第 8–约 280+ 行 | `categoryData: Record<string, {...}>`：vibratory-bowl-feeder、centrifugal-feeder、step-feeder、elevator-hopper、auxiliary-equipment 五类，每类含 title、tagline、valueProposition、systems[]、capabilities[]、applications[]、specifications[]、faqs[] |
| **占位图片** | 第 307 行 | `src={\`/images/products/${category}/system-01.jpg\`}`（Hero） |
| **占位图片** | 第 348 行 | `src={\`/images/products/${category}/${system.slug}.jpg\`}`（系统卡片） |
| **占位图片** | 第 440 行 | `src={\`/images/products/${category}/application-01.jpg\`}`（Applications 区块） |

**建议**：新增 Sanity 查询（按 category slug 取 productCategory + 其下 products）；本页 `generateMetadata` 与页面组件改为基于 fetch 结果；图片统一用 Sanity 资源 + `urlForImage()`；若无图则保留占位或占位图策略（可统一一个 placeholder 图）。

---

### 4. `app/products/[category]/[product]/page.tsx`

| 类型 | 位置（行号或片段） | 说明 |
|------|---------------------|------|
| **占位图片** | 第 72 行 | 主图：`src={\`/images/products/${category}/${product}.jpg\`}` |
| **占位图片** | 第 88 行 | 缩略图：`src={\`/images/products/${category}/${product}-0${i}.jpg\`}`（i=1..4） |
| **硬编码数组** | 第 309–313 行 | Related Products：`[{ name: "Sound Enclosure", slug: "sound-enclosure" }, ...]` 共 3 条 |
| **数据来源** | 整页 | 标题/描述等由 `category`/`product` slug 转成 name 显示，**无 Sanity product 文档** |

**建议**：新增按 category + product slug 查询单条 product 的 GROQ；本页改为 async，fetch 该 product；主图/图集用 `heroImage`、`galleryImages` 等 + `urlForImage()`；Related 改为 GROQ 同分类下其他 products 或 Sanity 的 related 引用。

---

### 5. `app/about/page.tsx`

| 类型 | 位置（行号或片段） | 说明 |
|------|---------------------|------|
| **兜底图** | 第 55 行 | `logoSrc = settings?.logo ? urlForImage(...) : "/logo.png"` |
| **硬编码数组** | 第 19–23 行 | `milestones`：2 条（year, event） |
| **硬编码数组** | 第 25–46 行 | `values`：4 条（icon, title, description） |
| **硬编码数组** | 第 48–50 行 | `certifications`：1 条 |
| **硬编码区块** | 第 106–124 行 | Stats：2005 / 16+ / 1000+ / 50+（与首页重复） |
| **硬编码区块** | 第 134–163 行 | Mission & Vision 卡片文案 |
| **硬编码列表** | 第 242–248 行 | Team/Facility 下 5 条 bullet；右侧为 `<Users className="..." />` 图标占位（无图） |

**建议**：logo 兜底保留 `/logo.png` 即可；milestones、values、certifications、stats、mission/vision、team 列表可迁到 Sanity（如 aboutPage 或 siteSettings 的 block content），便于运营编辑；Team 区块可增加一张真实图片字段替代 Users 图标。

---

### 6. `app/resources/page.tsx`

| 类型 | 位置（行号或片段） | 说明 |
|------|---------------------|------|
| **硬编码数组** | 第 13–37 行 | `featuredResources`：3 条（type, icon, title, description, slug, readTime） |
| **硬编码数组** | 第 39–75 行 | `articles`：6 条（title, category, slug, readTime） |
| **硬编码数组** | 第 77–102 行 | `downloads`：4 条（title, description, type, size） |
| **硬编码数组** | 第 104–119 行 | `videos`：3 条，其中 **thumbnail** 为占位名：`"bowl-feeder-video"`、`"flexible-feeder-video"`、**`"factory-tour-video"`**（非真实路径） |

**建议**：若资源/文章/下载/视频由 CMS 管理，在 Sanity 建 resource/article/download/video 类型与对应 GROQ；本页改为 fetch 后渲染；视频 thumbnail 改为真实 Sanity 图或 CDN URL，避免用占位 key。

---

### 7. `components/application-case.tsx`

| 类型 | 位置（行号或片段） | 说明 |
|------|---------------------|------|
| **默认占位图** | 第 11 行 | `imagePath = "/images/products/vibratory-bowl-feeder/application-01.jpg"` |
| **兜底图** | 第 72 行 | `src={imagePath || "/placeholder.svg"}` |

**建议**：调用方传入 Sanity 图片 URL（如 `urlForImage(caseStudy.image).url()`）；无图时保留 `/placeholder.svg` 或统一占位图；默认值可改为 null，由父组件决定是否传图。

---

### 8. `components/video-demo.tsx`

| 类型 | 位置（行号或片段） | 说明 |
|------|---------------------|------|
| **默认占位图** | 第 22 行 | `thumbnailPath = "/images/video-placeholder.jpg"`（当前组件内未渲染该 prop，仅占位语义） |

**建议**：若视频来自 Sanity，传入真实 thumbnail URL；无图时保留默认 `/images/video-placeholder.jpg` 或统一占位图；若需展示缩略图，在 UI 中使用 `thumbnailPath`。

---

### 9. `components/header.tsx`

| 类型 | 位置（行号或片段） | 说明 |
|------|---------------------|------|
| **兜底图** | 第 41–44 行 | `logoSrc = settings?.logo ? urlForImage(...) : "/logo.png"` |

**建议**：保留现有逻辑即可；仅当 Sanity 未配置 logo 时用静态 `/logo.png`。

---

### 10. `components/footer.tsx`

| 类型 | 位置（行号或片段） | 说明 |
|------|---------------------|------|
| **兜底图** | 第 35–38 行 | 同上，logo 兜底 `/logo.png` |
| **硬编码导航** | 第 8–24 行 | `footerNavigation.products`：5 个产品链接；company、support 链接 |

**建议**：产品链接可改为基于 `fetchProductCategories()` 动态生成（与 header 产品菜单一致）；company/support 可迁到 siteSettings 或保留硬编码。

---

## 四、不列入改动的项

- **`app/contact/page.tsx`**：Input/Select 的 `placeholder` 文案（John、Select inquiry type 等）为表单 UX，非内容占位。
- **`components/ui/input.tsx`、`textarea.tsx`、`select.tsx`**：仅 CSS 类名中的 `placeholder` 样式，无需改。

---

## 五、建议实施顺序（与 Sanity 对接）

1. **Sanity 层**：确认/扩展 product、productCategory、siteSettings、aboutPage、resource 等 schema 与 GROQ。
2. **lib**：在 `sanity.queries.ts` 增加 products（列表/单条）、category 详情、about、resources 等 query；必要时在 `lib` 下增加 `fetchProducts`、`fetchProductBySlug`、`fetchCategoryBySlug` 等。
3. **页面**：按上述“建议”从高优先级页面开始，逐页改为 fetch + Sanity 图片；保留 logo/无图时的兜底路径。
4. **组件**：`ApplicationCase`、`VideoDemo` 改为接收 Sanity 图 URL；header/footer 产品链接改为来自 `fetchProductCategories()`。

完成以上步骤后，占位图片与 mock 数据将逐步被 Sanity 数据与 CDN 图片替代，并便于后续扩展与维护。
