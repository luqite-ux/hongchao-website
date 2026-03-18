"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

export type HeroImage = { url: string; alt: string }

type Props = {
  images: HeroImage[]
  videoUrl?: string
  videoPosterUrl?: string
  productTitle: string
}

type MediaItem =
  | { kind: "video"; posterUrl?: string }
  | { kind: "image"; image: HeroImage }

export function ProductHeroMedia({
  images,
  videoUrl,
  videoPosterUrl,
  productTitle,
}: Props) {
  const safeImages = Array.isArray(images) ? images.filter((i) => i?.url) : []
  const media: MediaItem[] = useMemo(() => {
    const items: MediaItem[] = []
    if (videoUrl) items.push({ kind: "video", posterUrl: videoPosterUrl })
    for (const img of safeImages) items.push({ kind: "image", image: img })
    return items
  }, [safeImages, videoUrl, videoPosterUrl])

  const [activeIndex, setActiveIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const active = media[activeIndex]

  useEffect(() => {
    if (active?.kind !== "video") return
    const el = videoRef.current
    if (!el) return
    el.currentTime = 0
    void el.play().catch(() => {})
  }, [active?.kind, activeIndex])

  if (media.length === 0) return null

  return (
    <div className="space-y-3 w-full">
      <div className="relative">
        <div
          className="absolute -inset-4 rounded-[2rem] bg-slate-100/70 shadow-xl"
          aria-hidden
        />
        <div className="relative drop-shadow-2xl rounded-2xl overflow-hidden bg-white/90 p-4 flex items-center justify-center min-h-[280px]">
          <div className="w-full">
            <div className="aspect-[4/3] w-full max-h-[560px] bg-neutral-50 relative border border-slate-200 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <div className="relative w-full h-full">
                  {active?.kind === "video" && videoUrl ? (
                    <video
                      ref={videoRef}
                      className="absolute inset-0 w-full h-full object-contain"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls={false}
                      poster={active.posterUrl}
                    >
                      <source src={videoUrl} />
                    </video>
                  ) : (
                    <Image
                      src={active?.kind === "image" ? active.image.url : safeImages[0]?.url ?? "/placeholder.svg"}
                      alt={active?.kind === "image" ? active.image.alt : productTitle}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={activeIndex === 0}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {media.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {media.map((item, i) => {
            const isActive = activeIndex === i
            return (
              <button
                key={item.kind === "video" ? "video" : `${item.image.url}-${i}`}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`flex-shrink-0 w-16 h-16 relative rounded-lg border-2 overflow-hidden transition-colors ${
                  isActive
                    ? "border-[#FBA026]"
                    : "border-slate-200 hover:border-[#FBA026]/50"
                }`}
                aria-label={item.kind === "video" ? "Play video" : `View image ${i + 1}`}
              >
                {item.kind === "video" ? (
                  <>
                    <Image
                      src={item.posterUrl ?? safeImages[0]?.url ?? "/placeholder.svg"}
                      alt={`${productTitle} video`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    <span className="absolute inset-0 bg-black/25" aria-hidden />
                    <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
                      <span className="h-8 w-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                        <Play className="h-4 w-4 text-slate-900 translate-x-[1px]" />
                      </span>
                    </span>
                  </>
                ) : (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                )}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

