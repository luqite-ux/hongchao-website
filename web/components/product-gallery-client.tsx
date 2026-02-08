"use client"

import Image from "next/image"

export type GalleryImage = { url: string; alt: string }

type Props = {
  images: GalleryImage[]
  productTitle: string
}

/** 仅渲染产品主图，不变形、不裁切；不渲染缩略图 */
export function ProductGalleryClient({ images, productTitle }: Props) {
  if (images.length === 0) return null

  const mainImage = images[0]

  return (
    <div className="aspect-[4/3] w-full max-h-[560px] bg-neutral-50 relative border border-[#E5E5E5] overflow-hidden">
      <div className="absolute inset-4 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={mainImage.url}
            alt={mainImage.alt || productTitle}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  )
}
