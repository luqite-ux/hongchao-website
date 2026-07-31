import 'server-only'
import { getPublicSupabase, HONGCHAO_TENANT_ID } from './supabase-public'

type Locale = 'en' | 'de' | 'es'
const localized = (row: any, field: string, locale: Locale) => row?.[`${field}_i18n`]?.[locale] || row?.[`${field}_i18n`]?.en || row?.[field] || ''

function mapArticle(row: any, locale: Locale) {
  return {
    _id: row.id,
    title: localized(row, 'title', locale),
    slug: row.slug,
    excerpt: localized(row, 'excerpt', locale),
    content: localized(row, 'content', locale),
    publishedAt: row.published_at,
    coverImage: row.featured_image || null,
  }
}

export async function getPublishedArticles(locale: Locale = 'en') {
  const sb = getPublicSupabase(); if (!sb) return null
  const { data, error } = await sb.from('articles').select('*')
    .eq('tenant_id', HONGCHAO_TENANT_ID).eq('is_published', true)
    .order('published_at', { ascending: false })
  if (error) return null
  return (data || []).map((row) => mapArticle(row, locale))
}

export async function getArticleBySlug(slug: string, locale: Locale = 'en') {
  const sb = getPublicSupabase(); if (!sb) return null
  const { data, error } = await sb.from('articles').select('*')
    .eq('tenant_id', HONGCHAO_TENANT_ID).eq('slug', slug).eq('is_published', true).maybeSingle()
  return error || !data ? null : mapArticle(data, locale)
}
