export const HONGCHAO_TENANT_ID = 'ece3bbeb-1483-48bc-bd54-cf38d39fd3f9'

function requireTenant(tenantId) {
  if (tenantId !== HONGCHAO_TENANT_ID) throw new Error('foreign tenant is not allowed')
}

function requireSlug(doc) {
  const slug = String(doc.slug || '').trim()
  if (!slug) throw new Error(`${doc._id || 'document'} is missing slug`)
  return slug
}

function requireHttps(url) {
  if (url && !/^https:\/\//i.test(url)) throw new Error(`asset must use an absolute HTTPS URL: ${url}`)
  return url || null
}

function localized(doc, field) {
  const result = {}
  for (const locale of ['en', 'de', 'es']) {
    const key = locale === 'en' ? field : `${field}_${locale}`
    const value = doc[key]
    if (typeof value === 'string' && value.trim()) result[locale] = value.trim()
  }
  return result
}

function portableTextToHtml(value) {
  if (typeof value === 'string') return value
  if (!Array.isArray(value)) return ''
  return value.map((block) => {
    if (block?._type !== 'block') return ''
    const text = (block.children || []).map((child) => String(child?.text || '')).join('')
      .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    if (!text) return ''
    const tag = /^h[1-6]$/.test(block.style) ? block.style : 'p'
    return `<${tag}>${text}</${tag}>`
  }).filter(Boolean).join('\n')
}

function collectAssets(doc) {
  const urls = [
    doc.heroImageUrl,
    ...(doc.galleryUrls || []),
    ...(doc.technicalImageUrls || []),
    doc.engineeringImageUrl,
    doc.packagingImageUrl,
  ].filter(Boolean).map(requireHttps)
  return [...new Set(urls)]
}

export function mapSanityCategory(doc, tenantId, sortOrder = 0) {
  requireTenant(tenantId)
  const slug = requireSlug(doc)
  const image = requireHttps(doc.imageUrl)
  const nameI18n = localized(doc, 'title')
  const descriptionI18n = localized(doc, 'description')
  return {
    tenant_id: tenantId,
    slug,
    name: nameI18n.en || doc.title || slug,
    name_en: nameI18n.en || doc.title || slug,
    name_i18n: nameI18n,
    description: descriptionI18n.en || '',
    description_en: descriptionI18n.en || '',
    description_i18n: descriptionI18n,
    icon: image,
    sort_order: sortOrder,
    is_active: true,
    extra_data: { source_sanity_id: doc._id, source_image_url: image },
  }
}

export function mapSanityProduct(doc, tenantId, sortOrder = 0) {
  requireTenant(tenantId)
  const slug = requireSlug(doc)
  if (!doc.categorySlug) throw new Error(`${doc._id || slug} is missing category slug`)
  const nameI18n = localized(doc, 'title')
  const descriptionI18n = localized(doc, 'summary')
  const overviewI18n = {
    en: portableTextToHtml(doc.content),
    ...(doc.content_de ? { de: portableTextToHtml(doc.content_de) } : {}),
    ...(doc.content_es ? { es: portableTextToHtml(doc.content_es) } : {}),
  }
  const images = collectAssets(doc)
  const specs = Object.fromEntries((doc.specs || []).filter((item) => item?.label).map((item) => [String(item.label), String(item.value ?? '')]))
  return {
    tenant_id: tenantId,
    slug,
    name: nameI18n.en || doc.title || slug,
    name_en: nameI18n.en || doc.title || slug,
    name_i18n: nameI18n,
    description: descriptionI18n.en || '',
    description_en: descriptionI18n.en || '',
    description_i18n: descriptionI18n,
    category: doc.categoryTitle || doc.categorySlug,
    category_slug: doc.categorySlug,
    image_url: images[0] || null,
    specs,
    applications: doc.applications || [],
    applications_i18n: { en: doc.applications || [] },
    overview: overviewI18n.en || '',
    overview_en: overviewI18n.en || '',
    overview_i18n: overviewI18n,
    sort_order: sortOrder,
    is_active: true,
    extra_data: {
      source_sanity_id: doc._id,
      source_category_id: doc.categoryId || null,
      images,
      gallery: (doc.galleryUrls || []).map(requireHttps),
      technical_images: (doc.technicalImageUrls || []).map(requireHttps),
      engineering_image: requireHttps(doc.engineeringImageUrl),
      packaging_image: requireHttps(doc.packagingImageUrl),
      portable_text: doc.content || [],
    },
  }
}

export function mapSanityPost(doc, tenantId) {
  requireTenant(tenantId)
  const slug = requireSlug(doc)
  const titleI18n = localized(doc, 'title')
  const excerptI18n = localized(doc, 'excerpt')
  const contentI18n = {
    en: portableTextToHtml(doc.content),
    ...(doc.content_de ? { de: portableTextToHtml(doc.content_de) } : {}),
    ...(doc.content_es ? { es: portableTextToHtml(doc.content_es) } : {}),
  }
  return {
    tenant_id: tenantId,
    slug,
    title: titleI18n.en || doc.title || slug,
    title_en: titleI18n.en || doc.title || slug,
    title_i18n: titleI18n,
    excerpt: excerptI18n.en || '',
    excerpt_en: excerptI18n.en || '',
    excerpt_i18n: excerptI18n,
    content: contentI18n.en || '',
    content_en: contentI18n.en || '',
    content_i18n: contentI18n,
    featured_image: requireHttps(doc.coverImageUrl),
    is_published: true,
    published_at: new Date(doc.publishedAt || Date.now()).toISOString(),
  }
}
