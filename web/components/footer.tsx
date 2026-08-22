import Link from "next/link"
import Image from "next/image"
import type { ComponentType } from "react"
import { Mail, Phone, MapPin, Linkedin, Youtube, Facebook, Instagram } from "lucide-react"
import { CONTACT_PHONE_DISPLAY, CONTACT_EMAIL } from "@/lib/contact"
import type { SiteSettings } from "@/lib/site-settings"
import type { ProductCategory } from "@/lib/product-categories"
import { urlForImage } from "@/lib/sanity.image"
import { t, normalizeLocale } from "@/lib/i18n"
import { partitionProductNavCategories } from "@/lib/nav-product-categories"

/** 白底四列页脚；PRODUCTS 与 Header 下拉同源（fetchNavCategories），保证分类与链接一致 */

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

const supportLinks = [
  { name: "Resources", href: "/resources" },
  { name: "FAQ", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
]

function TikTokIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={props.className}>
      <path d="M16.7 7.5c-.9-.6-1.6-1.5-1.8-2.6-.1-.3-.1-.7-.1-1h-2.7v12.1c0 1.2-1 2.2-2.2 2.2-1.2 0-2.2-1-2.2-2.2 0-1.2 1-2.2 2.2-2.2.2 0 .5 0 .7.1V11c-.2 0-.5-.1-.7-.1-2.7 0-4.9 2.2-4.9 4.9 0 2.7 2.2 4.9 4.9 4.9 2.7 0 4.9-2.2 4.9-4.9V9.3c1.2.9 2.7 1.4 4.2 1.4V8c-1.1 0-2.2-.3-3.1-1z" />
    </svg>
  )
}

function XIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={props.className}>
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.8-6.2L6.6 22H2l7.4-8.5L1 2h6.3l4.4 5.7L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z" />
    </svg>
  )
}

const DEFAULT_ADDRESS =
  "No.81 CaiXing Road, LinHu Town, WuZhong District, SuZhou City, China"
const VERIFIED_LEGAL_NAME = "Suzhou Hongchao Automation Equipment Co., Ltd."

function withLocale(href: string, locale: string) {
  if (!href.startsWith("/")) return href
  if (locale === "en" || !locale) return href
  if (href === "/") return `/${locale}`
  const seg = href.split("/")[1]
  if (["en", "de", "es"].includes(seg)) return href
  return `/${locale}${href}`
}

export function Footer({
  settings,
  locale = "en",
  productCategories = [],
}: {
  settings?: SiteSettings | null
  locale?: string
  productCategories?: ProductCategory[]
}) {
  const address = settings?.contact?.address ?? DEFAULT_ADDRESS
  const social = settings?.social
  const loc = normalizeLocale(locale)
  const { primary: navPrimary, accessoryGroup } = partitionProductNavCategories(productCategories)
  const socialLinks: Array<{
    name: string
    href?: string
    icon: ComponentType<{ className?: string }>
  }> = [
    { name: "LinkedIn", href: social?.linkedin, icon: Linkedin },
    { name: "TikTok", href: social?.tiktok, icon: TikTokIcon },
    { name: "YouTube", href: social?.youtube, icon: Youtube },
    { name: "Facebook", href: social?.facebook, icon: Facebook },
    { name: "X", href: social?.twitter, icon: XIcon },
    { name: "Instagram", href: social?.instagram, icon: Instagram },
  ]

  const logoSource = settings?.logoSmall ?? settings?.logo
  const logoUrl = logoSource ? urlForImage(logoSource).width(80).height(80).fit("max").auto("format").url() : ""
  const footerCompanyName = VERIFIED_LEGAL_NAME.replace(/[.\s]+$/, "")

  return (
    <footer className="bg-white border-t border-slate-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* 页脚主体：四列（浅灰底） */}
      <div className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* 公司信息 */}
          <div className="lg:col-span-2">
            <Link href={withLocale("/", locale)} aria-label="Suzhou Hongchao Automation Equipment home" className="inline-flex items-center gap-3 mb-6">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={settings?.companyName ? `${settings.companyName} logo` : "Hongchao logo"}
                  width={52}
                  height={52}
                  className="h-[52px] w-[52px] max-w-full rounded-lg bg-white object-contain shrink-0"
                />
              ) : (
                <div className="h-[52px] w-[52px] bg-[#FBA026] rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
              )}
              <div>
                <span className="text-xl font-bold text-slate-800 tracking-tight block leading-tight">HONGCHAO</span>
                <span className="text-[10px] text-slate-500 tracking-[0.2em] uppercase">AUTOMATION</span>
              </div>
            </Link>

            <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-sm">
              Leading manufacturer of custom parts feeding systems since 2005. Precision engineering for global automation excellence.
            </p>

            <div className="space-y-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#FBA026] transition-colors">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                {CONTACT_EMAIL}
              </a>
              <a href={`tel:${CONTACT_PHONE_DISPLAY.replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#FBA026] transition-colors">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                {CONTACT_PHONE_DISPLAY}
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <span>{address}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((s) => {
                const href = typeof s.href === "string" ? s.href.trim() : ""
                const enabled = href.length > 0

                const cls =
                  "w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center transition-colors " +
                  (enabled
                    ? "text-slate-500 hover:bg-[#FBA026] hover:text-white"
                    : "text-slate-300 cursor-not-allowed")

                return enabled ? (
                  <a
                    key={s.name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                    aria-label={s.name}
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                ) : (
                  <span
                    key={s.name}
                    className={cls}
                    aria-label={s.name}
                    title="链接待配置"
                  >
                    <s.icon className="w-5 h-5" />
                  </span>
                )
              })}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
              PRODUCTS
            </h3>
            <ul className="m-0 list-none space-y-3 p-0">
              {productCategories.length > 0 ? (
                <>
                  {navPrimary.map((cat) => (
                    <li key={cat._id}>
                      <Link
                        href={withLocale(cat.slug ? `/products/${cat.slug}` : "/products", locale)}
                        className="text-sm text-slate-600 hover:text-[#FBA026] transition-colors"
                      >
                        {cat.title}
                      </Link>
                    </li>
                  ))}
                  {accessoryGroup.length > 0 ? (
                    <li className="pt-1">
                      <div className="text-sm font-semibold text-slate-800 mb-2">
                        {t(loc, "nav.accessoryGroup")}
                      </div>
                      <ul className="m-0 list-none space-y-2 border-l border-slate-200 pl-4">
                        {accessoryGroup.map((cat) => (
                          <li key={cat._id}>
                            <Link
                              href={withLocale(cat.slug ? `/products/${cat.slug}` : "/products", locale)}
                              className="text-sm text-slate-600 hover:text-[#FBA026] transition-colors"
                            >
                              {cat.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : null}
                </>
              ) : (
                <li>
                  <Link
                    href={withLocale("/products", locale)}
                    className="text-sm text-slate-600 hover:text-[#FBA026] transition-colors"
                  >
                    View all products
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
              COMPANY
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link href={withLocale(item.href, locale)} className="text-sm text-slate-600 hover:text-[#FBA026] transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
              SUPPORT
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <Link href={withLocale(item.href, locale)} className="text-sm text-slate-600 hover:text-[#FBA026] transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
      </div>

      {/* 底部版权与法律链接 */}
      <div className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} {footerCompanyName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href={withLocale("/privacy-policy", locale)} className="text-sm text-slate-500 hover:text-[#FBA026] transition-colors">
                Privacy Policy
              </Link>
              <Link href={withLocale("/terms-of-service", locale)} className="text-sm text-slate-500 hover:text-[#FBA026] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
