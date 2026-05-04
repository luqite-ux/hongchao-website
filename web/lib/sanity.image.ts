import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./sanity.client";

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * 校验 Sanity 图片源是否可解析为 URL。
 * 仅当 source 是带 asset 引用的对象 / 字符串 / 已有 _id 的资产时才有效。
 * 缺失 asset 或为空对象时，避免直接调用 builder 抛错导致页面 500。
 */
export function isValidSanityImageSource(source: unknown): source is SanityImageSource {
  if (!source) return false;
  if (typeof source === "string") return source.length > 0;
  if (typeof source !== "object") return false;
  const obj = source as Record<string, unknown>;
  if (typeof obj._ref === "string" && obj._ref.length > 0) return true;
  if (typeof obj._id === "string" && obj._id.length > 0) return true;
  if (typeof obj.url === "string" && obj.url.length > 0) return true;
  const asset = obj.asset as Record<string, unknown> | undefined;
  if (asset && typeof asset === "object") {
    if (typeof asset._ref === "string" && asset._ref.length > 0) return true;
    if (typeof asset._id === "string" && asset._id.length > 0) return true;
    if (typeof asset.url === "string" && asset.url.length > 0) return true;
  }
  return false;
}

/**
 * 产品主图/卡片图专用：忽略 Sanity 的 crop/hotspot/rect，禁止裁切。
 * 调用处只传 .width(...)，不要传 .height()。
 */
export function urlForProductImage(source: SanityImageSource) {
  return builder.image(source).ignoreImageParams().fit("max").auto("format");
}

/**
 * 安全版本：当 source 无效或解析失败时返回 null，避免渲染期抛错导致整页 500。
 * 用于产品详情等数据可能不完整的场景。
 */
export function safeProductImageUrl(source: unknown, width = 1200): string | null {
  if (!isValidSanityImageSource(source)) return null;
  try {
    return urlForProductImage(source).width(width).url();
  } catch {
    return null;
  }
}
