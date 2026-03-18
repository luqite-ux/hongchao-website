"use client"

import { useState } from "react"
import Image from "next/image"

export type GalleryImage = { url: string; alt: string }

type Props = {
  images: GalleryImage[]
  productTitle: string
  /** 已废弃：不再裁剪边缘，图片统一 object-contain 显示 */
  cropEdges?: boolean
}

/** 主图 + 多图时显示缩略图条，点击切换主图（产品详情页多角度图）。图片以 object-contain 完整显示，无裁剪。 */
export function ProductImageGallery({ images, productTitle }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const safeImages = Array.isArray(images) ? images.filter((i) => i?.url) : []
  if (safeImages.length === 0) return null

  const mainImage = safeImages[activeIndex] ?? safeImages[0]
  const alt = mainImage.alt || productTitle || "Product"

  return (
    <div className="space-y-3 w-full">
      {/* 主图容器：无 overflow-hidden/scale，仅 object-contain 完整显示 */}
      <div className="aspect-[4/3] w-full max-h-[560px] bg-neutral-50 relative border border-[#E5E5E5] rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center p-2">
          <div className="relative w-full h-full">
            <Image
            src={mainImage.url}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={activeIndex === 0}
          />
          </div>
        </div>
      </div>
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-16 h-16 relative rounded border-2 overflow-hidden transition-colors ${
                activeIndex === i ? "border-[#FBA026]" : "border-[#E5E5E5] hover:border-[#FBA026]/50"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
