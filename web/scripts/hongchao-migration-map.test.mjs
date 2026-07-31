import test from 'node:test'
import assert from 'node:assert/strict'
import { mapSanityCategory, mapSanityProduct, mapSanityPost } from './hongchao-migration-map.mjs'

const TENANT = 'ece3bbeb-1483-48bc-bd54-cf38d39fd3f9'

test('product mapping preserves routes, localized fields, specs, and all assets', () => {
  const row = mapSanityProduct({
    _id: 'product-1', title: 'Bowl Feeder', title_de: 'Zuführung', slug: 'bowl-feeder',
    summary: 'Summary', summary_es: 'Resumen', categoryId: 'cat-1', categoryTitle: 'Feeders',
    categorySlug: 'feeders', heroImageUrl: 'https://cdn.example/hero.jpg',
    galleryUrls: ['https://cdn.example/one.jpg'], technicalImageUrls: ['https://cdn.example/tech.jpg'],
    engineeringImageUrl: 'https://cdn.example/eng.jpg', packagingImageUrl: 'https://cdn.example/pkg.jpg',
    specs: [{ label: 'Voltage', value: '220V' }], applications: [{ application: 'Caps' }],
    content: [{ _type: 'block', children: [{ text: 'Body' }] }],
  }, TENANT)
  assert.equal(row.tenant_id, TENANT)
  assert.equal(row.slug, 'bowl-feeder')
  assert.equal(row.category_slug, 'feeders')
  assert.deepEqual(row.name_i18n, { en: 'Bowl Feeder', de: 'Zuführung' })
  assert.deepEqual(row.description_i18n, { en: 'Summary', es: 'Resumen' })
  assert.deepEqual(row.specs, { Voltage: '220V' })
  assert.deepEqual(row.extra_data.images, [
    'https://cdn.example/hero.jpg', 'https://cdn.example/one.jpg', 'https://cdn.example/tech.jpg',
    'https://cdn.example/eng.jpg', 'https://cdn.example/pkg.jpg',
  ])
})

test('category and article mapping preserve slugs and publication data', () => {
  const category = mapSanityCategory({ _id: 'cat-1', title: 'Feeders', title_es: 'Alimentadores', slug: 'feeders', imageUrl: 'https://cdn.example/cat.jpg' }, TENANT, 2)
  assert.equal(category.slug, 'feeders')
  assert.equal(category.extra_data.source_sanity_id, 'cat-1')
  assert.equal(category.sort_order, 2)
  const article = mapSanityPost({ _id: 'post-1', title: 'Guide', slug: 'guide', excerpt: 'Intro', content: [{ _type: 'block', children: [{ text: 'Hello' }] }], coverImageUrl: 'https://cdn.example/post.jpg', publishedAt: '2026-01-02T00:00:00Z' }, TENANT)
  assert.equal(article.slug, 'guide')
  assert.equal(article.featured_image, 'https://cdn.example/post.jpg')
  assert.equal(article.is_published, true)
  assert.equal(article.published_at, '2026-01-02T00:00:00.000Z')
})

test('mapping rejects missing slug, foreign tenant, and relative images', () => {
  assert.throws(() => mapSanityProduct({ _id: 'p', title: 'No slug', categorySlug: 'x' }, TENANT), /slug/)
  assert.throws(() => mapSanityCategory({ _id: 'c', title: 'X', slug: 'x' }, 'wrong'), /tenant/)
  assert.throws(() => mapSanityPost({ _id: 'a', title: 'X', slug: 'x', coverImageUrl: '/local.jpg' }, TENANT), /absolute HTTPS/)
})
