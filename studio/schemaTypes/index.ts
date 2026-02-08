import { siteSettings } from './siteSettings'
import { productCategory } from './productCategory'
import { product } from './product'
import { homepage } from './homepage'
import { caseStudy } from './caseStudy'
import { video } from './video'
import { inquiry } from './inquiry'
import { patent } from './patent'

export const schemaTypes = [
  siteSettings,
  productCategory,
  product,
  homepage,
  caseStudy,
  video,
  inquiry,
  patent,
]

console.log('[Sanity schema] schemaTypes.length:', schemaTypes.length)
