"use client"

import { useState } from "react"
import Image from "next/image"

export type GalleryImage = { url: string; alt: string }

type Props = {
  images: GalleryImage[]
  productTitle: string
}

export function ProductGalleryClient({ images, productTitle }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (images.length === 0) return null

  const activeImage = images[activeIndex]

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-[4/3] w-full max-h-[560px] bg-gray-50 relative border border-[#E5E5E5]">
        <div className="absolute inset-4 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={activeImage.url}
              alt={activeImage.alt || productTitle}
              fill
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={activeIndex === 0}
            />
          </div>
        </div>
      </div>

      {/* Thumbnails - only when more than one image */}
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`aspect-square relative overflow-hidden border bg-[#F5F5F5] transition-colors text-left focus:outline-none focus:ring-2 focus:ring-[#F6A12A] focus:ring-offset-2 ${
                i === activeIndex
                  ? "border-2 border-orange-500"
                  : "border border-[#E5E5E5] hover:border-[#F6A12A]/50"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || `${productTitle} view ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 12vw"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
