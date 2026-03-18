import { siteSettings } from './siteSettings'
import { productCategory } from './productCategory'
import { product } from './product'
import { homepage } from './homepage'
import { caseStudy } from './caseStudy'
import { video } from './video'
import { inquiry } from './inquiry'
import { patent } from './patent'
import { post } from './post'
import { docPage } from './docPage'
import { faqPage } from './faqPage'

export const schemaTypes = [
  siteSettings,
  productCategory,
  product,
  homepage,
  caseStudy,
  video,
  inquiry,
  patent,
  post,
  docPage,
  faqPage,
]

console.log('[Sanity schema] schemaTypes.length:', schemaTypes.length)
