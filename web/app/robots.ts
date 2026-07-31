import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/studio', '/search'] }],
    sitemap: 'https://www.hongchaoautomation.cn/sitemap.xml',
    host: 'https://www.hongchaoautomation.cn',
  }
}
