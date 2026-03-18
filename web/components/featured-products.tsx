"use client"

import Image from "next/image"
import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname, t, withLocale } from "@/lib/i18n"

/** 单条产品：可带 imageUrl 则展示产品图（图6），否则展示图标 */
export type FeaturedProductItem = {
  name: string
  description: string
  tag: string
  href: string
  imageUrl?: string | null
}

/** v0 视觉：Vibratory Bowl Feeder 首位，5 卡一排，白底 + 圆角；有图则展图 */
const defaultProducts: FeaturedProductItem[] = [
  { name: "Vibratory Bowl Feeder", description: "High-precision vibratory feeding systems for automated assembly lines.", tag: "Best Seller", href: "/products/vibration-bowl-feeder" },
  { name: "Centrifugal Feeder", description: "High-speed rotary feeding for maximum throughput efficiency.", tag: "High Speed", href: "/products/centrifugal-feeder" },
  { name: "Step Feeder", description: "Gentle handling for delicate and sensitive components.", tag: "Gentle Feed", href: "/products/step-feeder" },
  { name: "Linear Feeder", description: "Precise linear conveying and orientation systems.", tag: "Precision", href: "/products/linear-feeder" },
  { name: "Hopper System", description: "Bulk storage and controlled feeding solutions.", tag: "Bulk Feed", href: "/products/hopper" },
]

function ProductIcon({ index }: { index: number }) {
  const icons = [
    <svg key="1" viewBox="0 0 64 64" fill="none" className="w-20 h-20">
      <circle cx="32" cy="32" r="28" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="18" stroke="#FBA026" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="32" cy="32" r="8" stroke="#FBA026" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="3" fill="#FBA026" />
      <path d="M14 32 Q20 20 32 14 Q44 20 50 32" stroke="#cbd5e1" strokeWidth="1" fill="none" />
      <path d="M14 32 Q20 44 32 50 Q44 44 50 32" stroke="#cbd5e1" strokeWidth="1" fill="none" />
    </svg>,
    <svg key="2" viewBox="0 0 64 64" fill="none" className="w-20 h-20">
      <circle cx="32" cy="32" r="26" stroke="#e2e8f0" strokeWidth="1.5" />
      <path d="M32 8 L36 18 L32 16 L28 18 Z" fill="#FBA026" />
      <path d="M56 32 L46 36 L48 32 L46 28 Z" fill="#FBA026" />
      <path d="M32 56 L28 46 L32 48 L36 46 Z" fill="#FBA026" />
      <path d="M8 32 L18 28 L16 32 L18 36 Z" fill="#FBA026" />
      <circle cx="32" cy="32" r="10" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="4" fill="#FBA026" />
    </svg>,
    <svg key="3" viewBox="0 0 64 64" fill="none" className="w-20 h-20">
      <rect x="8" y="44" width="48" height="8" rx="2" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="8" y="32" width="36" height="8" rx="2" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="8" y="20" width="24" height="8" rx="2" stroke="#FBA026" strokeWidth="1.5" />
      <rect x="8" y="8" width="12" height="8" rx="2" stroke="#FBA026" strokeWidth="1.5" fill="#FBA026" fillOpacity="0.1" />
      <path d="M20 12 L56 12" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
    </svg>,
    <svg key="4" viewBox="0 0 64 64" fill="none" className="w-20 h-20">
      <rect x="8" y="28" width="48" height="8" rx="4" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="8" y="28" width="28" height="8" rx="4" stroke="#FBA026" strokeWidth="1.5" fill="#FBA026" fillOpacity="0.08" />
      <circle cx="22" cy="32" r="4" stroke="#FBA026" strokeWidth="1.5" />
      <circle cx="42" cy="32" r="3" stroke="#94a3b8" strokeWidth="1.5" />
      <path d="M32 16 L32 28 M32 36 L32 48" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M48 22 L56 32 L48 42" stroke="#FBA026" strokeWidth="1.5" fill="none" />
    </svg>,
    <svg key="5" viewBox="0 0 64 64" fill="none" className="w-20 h-20">
      <path d="M12 12 L52 12 L44 44 L20 44 Z" stroke="#e2e8f0" strokeWidth="1.5" fill="#f8fafc" />
      <path d="M20 44 L24 56 L40 56 L44 44" stroke="#FBA026" strokeWidth="1.5" fill="#FBA026" fillOpacity="0.08" />
      <line x1="12" y1="12" x2="52" y2="12" stroke="#FBA026" strokeWidth="2" />
      <circle cx="24" cy="52" r="2" fill="#FBA026" />
      <circle cx="32" cy="54" r="2" fill="#FBA026" />
      <circle cx="40" cy="52" r="2" fill="#FBA026" />
      <path d="M20 24 L44 24" stroke="#cbd5e1" strokeWidth="1" />
      <path d="M22 34 L42 34" stroke="#cbd5e1" strokeWidth="1" />
    </svg>,
  ]
  return icons[index] ?? null
}

type Props = { items?: FeaturedProductItem[] }

export function FeaturedProducts({ items }: Props) {
  const products = items && items.length >= 5 ? items : defaultProducts
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname || "/")

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-[#FBA026] text-sm font-semibold uppercase tracking-widest mb-4">
            {t(locale, "featured.eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight text-balance">
            {t(locale, "featured.title")}
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {t(locale, "featured.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {products.slice(0, 5).map((product, index) => (
            <Link
              key={`${product.href}-${index}`}
              href={withLocale(product.href, locale)}
              className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#FBA026]/60 hover:shadow-[0_8px_32px_0_rgba(251,160,38,0.12)] transition-all duration-300 flex flex-col"
            >
              <div className="relative flex items-center justify-center bg-slate-50 pt-6 pb-4 px-4 min-h-[180px]" style={{ boxShadow: "inset 0 -1px 0 0 #e2e8f0" }}>
                <span className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wider text-[#FBA026] bg-[#FBA026]/10 px-2 py-0.5 rounded-full">
                  {product.tag}
                </span>
                {product.imageUrl ? (
                  <div className="relative w-full h-40 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 50vw, 20vw"
                    />
                  </div>
                ) : (
                  <div className="group-hover:scale-105 transition-transform duration-300 drop-shadow-sm">
                    <ProductIcon index={index} />
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-slate-800 group-hover:text-[#FBA026] transition-colors text-sm leading-snug">
                  {product.name}
                </h3>
                <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[#FBA026] text-xs font-semibold">
                  <span>{t(locale, "featured.learnMore")}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={withLocale("/products", locale)}
            className="inline-flex items-center gap-2 px-8 py-3 border border-slate-200 rounded-lg text-slate-700 font-semibold hover:border-[#FBA026] hover:text-[#FBA026] transition-colors"
          >
            {t(locale, "featured.viewAll")}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={withLocale("/catalog", locale)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#FBA026] hover:bg-[#e8922a] text-white rounded-lg font-semibold shadow-[0_4px_16px_0_rgba(251,160,38,0.30)] hover:shadow-[0_4px_24px_0_rgba(251,160,38,0.45)] transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            {t(locale, "featured.downloadCatalog")}
          </Link>
        </div>
      </div>
    </section>
  )
}
