import { siteSettings } from './siteSettings'
import { productCategory } from './productCategory'
import { product } from './product'
import { caseStudy } from './caseStudy'
import { video } from './video'
import { inquiry } from './inquiry'

export const schemaTypes = [
  siteSettings,
  productCategory,
  product,
  caseStudy,
  video,
  inquiry,
]

console.log('[Sanity schema] schemaTypes.length:', schemaTypes.length)
