import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./sanity.client";
import { homepageQuery } from "./sanity/queries";

export interface TrustSectionData {
  exhibitionImages?: string[] | null;
  clientVisitImages?: string[] | null;
  inspectionText?: string | null;
  inspectionImageUrl?: string | null;
}

/** 首页精选产品（来自 Sanity featuredProducts），含主图用于展示 */
export interface HomepageFeaturedProduct {
  _id: string;
  title: string;
  excerpt?: string | null;
  slug: string | null;
  mainImage?: SanityImageSource | null;
  category?: { title?: string; slug?: string | null } | null;
}

export interface HomepageData {
  stats?: { value: string; label: string }[];
  featuredCategories?: unknown;
  featuredProducts?: HomepageFeaturedProduct[] | null;
  trustSection?: TrustSectionData | null;
  hero?: unknown;
}

export async function fetchHomepage(): Promise<HomepageData | null> {
  try {
    const data = await sanityClient.fetch<HomepageData | null>(homepageQuery, {}, { next: { revalidate: 60 } });
    return data;
  } catch {
    return null;
  }
}

