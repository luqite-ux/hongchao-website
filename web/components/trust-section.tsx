"use client"

import { TrustGallery } from "@/components/trust-gallery"

/**
 * 内页复用首页的 Global Presence 展示方式，确保图片排列与交互一致。
 * - 首页：`TrustGallery`
 * - 内页：继续导出 `TrustSection` 以兼容现有引用
 */
export function TrustSection() {
  return <TrustGallery />
}
