import type { MetadataRoute } from 'next'
import { getProductCatalog } from '@/lib/products-db'
import { getPublishedArticles } from '@/lib/articles-db'

const BASE = 'https://www.hongchaoautomation.cn'
const staticPaths = ['/', '/about', '/products', '/blog', '/contact', '/industries', '/solutions', '/technology', '/videos', '/catalog', '/resources', '/case-studies', '/faq', '/privacy-policy', '/terms-of-service']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [catalog, articles] = await Promise.all([getProductCatalog('en'), getPublishedArticles('en')])
  const now = new Date()
  const rows: MetadataRoute.Sitemap = staticPaths.map((path) => ({ url: `${BASE}${path}`, lastModified: now }))
  for (const category of catalog?.categories || []) rows.push({ url: `${BASE}/products/${category.slug}`, lastModified: now })
  for (const product of catalog?.products || []) rows.push({ url: `${BASE}/products/${product.category.slug}/${product.slug}`, lastModified: now })
  for (const article of articles || []) rows.push({ url: `${BASE}/blog/${article.slug}`, lastModified: article.publishedAt ? new Date(article.publishedAt) : now })
  return rows
}
