"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Globe } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// TODO: Integrate with next-intl middleware

/** 支持的语种：en 为默认无前缀，de/es 为带前缀如 /de/xxx */
const LANGUAGES = [
  { code: "en", label: "English", short: "EN", flag: "🇺🇸" },
  { code: "de", label: "Deutsch", short: "DE", flag: "🇩🇪" },
  { code: "es", label: "Español", short: "ES", flag: "🇪🇸" },
] as const

const LOCALE_PREFIXES = ["/de", "/es"] as const

function getLocaleFromPathname(pathname: string): string {
  for (const prefix of LOCALE_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) return prefix.slice(1)
  }
  return "en"
}

/** 去掉路径中的语种前缀，得到「无语种路径」 */
function getPathWithoutLocale(pathname: string): string {
  for (const prefix of LOCALE_PREFIXES) {
    if (pathname === prefix) return "/"
    if (pathname.startsWith(prefix + "/")) return pathname.slice(prefix.length) || "/"
  }
  return pathname
}

/** 根据语种和无语种路径生成最终路径 */
function buildLocalizedPath(locale: string, pathWithoutLocale: string): string {
  const path = pathWithoutLocale || "/"
  if (locale === "en") return path
  return `/${locale}${path}`
}

export function LanguageSwitcher({
  className,
  size = "default",
}: {
  className?: string
  size?: "sm" | "default"
}) {
  const pathname = usePathname()
  const router = useRouter()
  const pathLocale = getLocaleFromPathname(pathname)
  const pathWithoutLocale = getPathWithoutLocale(pathname)

  // 使用 useState 模拟语种切换效果（未接入 next-intl 时的本地状态）
  const [locale, setLocale] = useState(pathLocale)
  useEffect(() => {
    setLocale(pathLocale)
  }, [pathLocale])

  function onValueChange(newLocale: string) {
    setLocale(newLocale)
    const newPath = buildLocalizedPath(newLocale, pathWithoutLocale)
    router.push(newPath)
  }

  const current = LANGUAGES.find((l) => l.code === locale)
  const isCompact = size === "sm"

  return (
    <Select value={locale} onValueChange={onValueChange}>
      <SelectTrigger
        size={size}
        className={cn(
          "border-0 bg-transparent shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
          "text-slate-500 hover:bg-slate-200/50 hover:text-slate-600",
          "min-w-0 gap-1.5 px-2 py-1.5",
          isCompact && "text-xs data-[size=sm]:h-7",
          className
        )}
        aria-label="Switch language version"
      >
        <Globe className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
        {/* Radix Select 需要一个 Value 节点做内部绑定；这里隐藏真实 value，仅展示简写 */}
        <span className="sr-only">
          <SelectValue />
        </span>
        <span className="tabular-nums" aria-hidden>
          {current ? current.short : locale.toUpperCase()}
        </span>
      </SelectTrigger>
      <SelectContent
        align="end"
        className="bg-white border-slate-200/80 shadow-lg shadow-slate-200/30 rounded-lg py-1 min-w-[7rem]"
      >
        {LANGUAGES.map(({ code, label, short, flag }) => (
          <SelectItem
            key={code}
            value={code}
            className="gap-2 py-2 pl-2.5 pr-8 text-sm text-slate-700 focus:bg-slate-50 focus:text-slate-900"
          >
            <span className="text-base leading-none" aria-hidden>
              {flag}
            </span>
            <span>
              {label} <span className="text-slate-400">({short})</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
