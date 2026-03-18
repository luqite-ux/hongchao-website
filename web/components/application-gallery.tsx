"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export type ApplicationCase = {
  imageUrl: string
  industry?: string | null
}

export function ApplicationGallery({
  cases,
}: {
  cases: ApplicationCase[]
}) {
  const list = Array.isArray(cases) ? cases.filter((c) => c?.imageUrl) : []
  if (list.length === 0) return null

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1.1}
        breakpoints={{
          640: { slidesPerView: 1.6 },
          1024: { slidesPerView: 2.4 },
        }}
      >
        {list.map((c, idx) => (
          <SwiperSlide key={`${c.imageUrl}-${idx}`}>
            <div className="group rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
              <div className="aspect-[16/10] relative">
                <Image
                  src={c.imageUrl}
                  alt={c.industry ? `${c.industry} application` : "Application case"}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 33vw"
                />
              </div>
              <div className="p-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Industry
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {c.industry ?? "Industrial Automation"}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

