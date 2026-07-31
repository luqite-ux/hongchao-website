import 'server-only'
import { getPublicSupabase, HONGCHAO_TENANT_ID } from './supabase-public'

type Locale = 'en' | 'de' | 'es'
const localized = (row: any, field: string, locale: Locale) => row?.[`${field}_i18n`]?.[locale] || row?.[`${field}_i18n`]?.en || row?.[field] || ''

function mapCategory(row: any, locale: Locale) {
  return { _id: row.id, title: localized(row, 'name', locale), slug: row.slug, description: localized(row, 'description', locale), image: row.icon || null }
}

function mapProduct(row: any, locale: Locale) {
  const extra = row.extra_data || {}
  return {
    _id: row.id, title: localized(row, 'name', locale), slug: row.slug,
    excerpt: localized(row, 'description', locale), mainImage: row.image_url,
    gallery: extra.gallery || extra.images?.slice(1) || [], technicalImages: extra.technical_images || [],
    engineeringImage: extra.engineering_image || null, packagingImage: extra.packaging_image || null,
    body: row.overview_i18n?.[locale] || row.overview_i18n?.en || row.overview || '',
    video: null,
    applications: row.applications || [],
    specs: Object.entries(row.specs || {}).map(([label, value]) => ({ label, value: String(value ?? '') })),
    category: { title: row.category || row.category_slug, slug: row.category_slug },
  }
}

export async function getProductCatalog(locale: Locale = 'en') {
  const sb = getPublicSupabase(); if (!sb) return null
  const [{ data: categories, error: ce }, { data: products, error: pe }] = await Promise.all([
    sb.from('product_categories').select('*').eq('tenant_id', HONGCHAO_TENANT_ID).eq('is_active', true).order('sort_order'),
    sb.from('products').select('*').eq('tenant_id', HONGCHAO_TENANT_ID).eq('is_active', true).order('sort_order'),
  ])
  if (ce || pe) return null
  return { categories: (categories || []).map((x) => mapCategory(x, locale)), products: (products || []).map((x) => mapProduct(x, locale)) }
}

export async function getCategoryBySlug(slug: string, locale: Locale = 'en') {
  const catalog = await getProductCatalog(locale); if (!catalog) return null
  const category = catalog.categories.find((x) => x.slug === slug); if (!category) return null
  return { ...category, products: catalog.products.filter((x) => x.category.slug === slug) }
}

export async function getProductBySlugs(categorySlug: string, productSlug: string, locale: Locale = 'en') {
  const catalog = await getProductCatalog(locale); if (!catalog) return null
  const product = catalog.products.find((x) => x.slug === productSlug && x.category.slug === categorySlug)
  if (!product) return null
  return { ...product, related: catalog.products.filter((x) => x.category.slug === categorySlug && x._id !== product._id).slice(0, 3) }
}
