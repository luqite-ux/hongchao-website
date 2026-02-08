import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./sanity.client";

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * 产品主图/卡片图专用：忽略 Sanity 的 crop/hotspot/rect，禁止裁切。
 * 调用处只传 .width(...)，不要传 .height()。
 */
export function urlForProductImage(source: SanityImageSource) {
  return builder.image(source).ignoreImageParams().fit("max").auto("format");
}
