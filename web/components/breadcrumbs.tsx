"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export type BreadcrumbItem = { label: string; href?: string }

type Props = { items: BreadcrumbItem[] }

function withLocale(href: string, locale: string) {
  if (!href.startsWith("/")) return href
  if (locale === "en" || !locale) return href
  if (href === "/") return `/${locale}`
  const seg = href.split("/")[1]
  if (["en", "de", "es"].includes(seg)) return href
  return `/${locale}${href}`
}

/** 内页顶部简约亮色面包屑，文字 text-slate-500 */
export function Breadcrumbs({ items }: Props) {
  const pathname = usePathname()
  const locale = ["en", "de", "es"].includes((pathname || "/").split("/")[1])
    ? (pathname || "/").split("/")[1]
    : "en"

  return (
    <div className="border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
          {items.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-slate-300">/</span>}
              {item.href != null ? (
                <Link href={withLocale(item.href, locale)} className="hover:text-[#FBA026] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-800 font-medium">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  )
}
