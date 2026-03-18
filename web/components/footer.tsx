import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Youtube, Facebook, Twitter } from "lucide-react"
import { CONTACT_PHONE_DISPLAY, CONTACT_EMAIL } from "@/lib/contact"
import type { SiteSettings } from "@/lib/site-settings"

/** 白底四列页脚，与 v0-ref 一致，不再重复 Engineers/Countries（由 AboutSection 统一展示） */
const productLinks = [
  { name: "Vibratory Bowl Feeder", href: "/products/vibration-bowl-feeder" },
  { name: "Centrifugal Feeder", href: "/products/centrifugal-feeder" },
  { name: "Step Feeder", href: "/products/step-feeder" },
  { name: "Linear Feeder", href: "/products/linear-feeder" },
  { name: "Hopper System", href: "/products/hopper" },
  { name: "Custom Solutions", href: "/products" },
]

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Process", href: "/technology" },
  { name: "Case Studies", href: "/catalog" },
  { name: "News & Blog", href: "/about" },
  { name: "Careers", href: "/contact" },
  { name: "Contact", href: "/contact" },
]

const supportLinks = [
  { name: "Technical Support", href: "/contact" },
  { name: "Documentation", href: "/technology" },
  { name: "FAQs", href: "/contact" },
  { name: "Warranty", href: "/contact" },
  { name: "Parts & Service", href: "/contact" },
]

const socialLinks = [
  { name: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#", icon: Linkedin },
  { name: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "#", icon: Youtube },
  { name: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#", icon: Facebook },
  { name: "Twitter", href: process.env.NEXT_PUBLIC_TWITTER_URL || "#", icon: Twitter },
]

const DEFAULT_ADDRESS = "No. 168 Automation Road, Ningbo, Zhejiang, China 315000"

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const address = settings?.contact?.address ?? DEFAULT_ADDRESS

  return (
    <footer className="bg-white border-t border-slate-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* 页脚主体：四列（浅灰底） */}
      <div className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* 公司信息 */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#FBA026] rounded-lg flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xl">H</span>
              </div>
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
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#FBA026] hover:text-white transition-colors"
                  aria-label={s.name}
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
              PRODUCTS
            </h3>
            <ul className="space-y-3">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-slate-600 hover:text-[#FBA026] transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
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
                  <Link href={item.href} className="text-sm text-slate-600 hover:text-[#FBA026] transition-colors">
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
                  <Link href={item.href} className="text-sm text-slate-600 hover:text-[#FBA026] transition-colors">
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
              © {new Date().getFullYear()} Hongchao. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-sm text-slate-500 hover:text-[#FBA026] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-slate-500 hover:text-[#FBA026] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
