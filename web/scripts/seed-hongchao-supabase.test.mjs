import test from 'node:test'
import assert from 'node:assert/strict'
import { replaceAssetUrls, assertR2Rows } from './seed-hongchao-supabase.mjs'

const TENANT = 'ece3bbeb-1483-48bc-bd54-cf38d39fd3f9'

test('deep asset replacement rewrites nested source URLs', () => {
  const value = { cover: 'https://cdn.sanity.io/a.jpg', gallery: ['https://cdn.sanity.io/b.jpg'] }
  const map = new Map([
    ['https://cdn.sanity.io/a.jpg', 'https://pub.example/products/a.jpg'],
    ['https://cdn.sanity.io/b.jpg', 'https://pub.example/products/b.jpg'],
  ])
  assert.deepEqual(replaceAssetUrls(value, map), {
    cover: 'https://pub.example/products/a.jpg', gallery: ['https://pub.example/products/b.jpg'],
  })
})

test('row guard rejects foreign tenants and non-R2 content images', () => {
  assert.throws(() => assertR2Rows([{ tenant_id: 'foreign', image_url: 'https://pub.example/a.jpg' }], TENANT, 'https://pub.example'), /tenant/)
  assert.throws(() => assertR2Rows([{ tenant_id: TENANT, image_url: 'https://cdn.sanity.io/a.jpg' }], TENANT, 'https://pub.example'), /R2/)
  assert.doesNotThrow(() => assertR2Rows([{ tenant_id: TENANT, image_url: 'https://pub.example/a.jpg', extra_data: { images: ['https://pub.example/b.jpg'] } }], TENANT, 'https://pub.example'))
})
