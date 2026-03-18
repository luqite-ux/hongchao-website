"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname, t, withLocale } from "@/lib/i18n"

/** 11 Patents、1000+ Projects、50+ Countries，v0 视觉；每项链至对应页面 */
const stats = [
  { value: 11, suffix: "", labelKey: "stats.patents", href: "/technology" },
  { value: 1000, suffix: "+", labelKey: "stats.projects", href: "/products" },
  { value: 50, suffix: "+", labelKey: "stats.countries", href: "/about" },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-800 tracking-tight">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

export function StatsBar() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname || "/")

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-slate-200" />
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: "radial-gradient(circle, #64748b 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <Link
              key={stat.labelKey}
              href={withLocale(stat.href, locale)}
              className="text-center relative block hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBA026] focus-visible:ring-offset-2 rounded-lg"
            >
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-px h-20 -translate-y-1/2 bg-slate-200" />
              )}
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="w-12 h-px bg-[#FBA026]" />
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  {t(locale, stat.labelKey)}
                </span>
                <div className="w-12 h-px bg-[#FBA026]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-200" />
    </section>
  )
}
