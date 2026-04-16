import type { ProductCategory } from "@/lib/product-categories"

/**
 * 头部/页脚产品导航：将「附加件 / 备件」类 slug 归为二级（缩进），与 CMS 中常见 slug 对齐。
 * 未命中的分类全部作为一级显示。
 */
function isAccessoryNavChild(slug: string | null | undefined): boolean {
  if (!slug) return false
  const s = slug.toLowerCase()
  if (s === "additional-components" || s === "spare-components") return true
  if (s.includes("additional") && s.includes("component")) return true
  if (s.includes("spare") && s.includes("component")) return true
  return false
}

export function partitionProductNavCategories(categories: ProductCategory[]) {
  const primary: ProductCategory[] = []
  const accessoryGroup: ProductCategory[] = []
  for (const cat of categories) {
    if (isAccessoryNavChild(cat.slug)) accessoryGroup.push(cat)
    else primary.push(cat)
  }
  return { primary, accessoryGroup }
}
