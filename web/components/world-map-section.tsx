"use client"

import { Globe } from "lucide-react"

/**
 * 50+ Countries 展示。国家列表可后续从 props 或配置传入，用于高亮。
 * 当前为占位：展示 50+ 与简短说明，预留地图可视化接口。
 */
export function WorldMapSection({
  countries,
  className,
}: {
  countries?: string[]
  className?: string
}) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#F6A12A]/10 flex items-center justify-center">
            <Globe className="h-12 w-12 text-[#F6A12A]" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#1F1F1F]">50+ Countries</h3>
            <p className="mt-2 text-[#6B6B6B]">
              We serve manufacturers worldwide with technical support and reliable delivery. Our feeding systems are in use across Asia, Europe, Americas, and more.
            </p>
            {countries && countries.length > 0 && (
              <p className="mt-3 text-sm text-[#6B6B6B]">
                Including: {countries.slice(0, 12).join(", ")}
                {countries.length > 12 ? " …" : ""}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
