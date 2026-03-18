"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { getLocaleFromPathname, t, withLocale } from "@/lib/i18n"

const HERO_VIDEO_SRC = "/videos/hero-bg.mp4"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname || "/")

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23f1f5f9' width='1920' height='1080'/%3E%3C/svg%3E"
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/90" />
      </div>

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(to right, #64748b 1px, transparent 1px),
            linear-gradient(to bottom, #64748b 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 mb-8">
          <div className="w-2 h-2 bg-[#FBA026] rounded-full animate-pulse" />
          <span className="text-sm font-medium text-slate-600">{t(locale, "hero.since")}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 tracking-tight leading-tight text-balance">
          {t(locale, "hero.titleA")}
          <span className="block text-[#FBA026]">{t(locale, "hero.titleB")}</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
          {t(locale, "hero.subtitle")}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold px-8 py-6 text-base rounded-lg">
            <Link href={withLocale("/products", locale)}>
              {t(locale, "hero.explore")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold px-8 py-6 text-base rounded-lg">
            <Link href={withLocale("/videos", locale)}>
              <Play className="mr-2 w-5 h-5" />
              {t(locale, "hero.watch")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
