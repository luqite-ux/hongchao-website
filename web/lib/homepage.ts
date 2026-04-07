import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./sanity.client";
import { homepageQuery } from "./sanity/queries";
import type { Locale } from "@/lib/i18n";

export interface TrustSectionData {
  exhibitionImages?: string[] | null;
  clientVisitImages?: string[] | null;
  inspectionImages?: string[] | null;
}

export interface TestimonialItem {
  _key?: string;
  quote?: string | null;
  name?: string | null;
  title?: string | null;
  company?: string | null;
  country?: string | null;
  focus?: string | null;
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

/** 首页 About 区块：公司介绍视频（Sanity 源文件 CDN URL + 可选封面） */
export interface HomepageAboutSection {
  videoUrl?: string | null;
  poster?: SanityImageSource | null;
}

export interface HomepageData {
  stats?: { value: string; label: string }[];
  featuredCategories?: unknown;
  featuredProducts?: HomepageFeaturedProduct[] | null;
  trustSection?: TrustSectionData | null;
  testimonials?: TestimonialItem[] | null;
  hero?: { videoUrl?: string | null } | null;
  aboutSection?: HomepageAboutSection | null;
}

/** GROQ 原始 trustSection（含旧版单图 URL，在 fetch 内合并进 inspectionImages） */
type TrustSectionFetched = TrustSectionData & {
  _inspectionImageLegacyUrl?: string | null;
};

function normalizeTrustSection(raw: TrustSectionFetched | null | undefined): TrustSectionData | null {
  if (!raw) return null;
  const urls = (raw.inspectionImages ?? []).filter((u): u is string => Boolean(u));
  const legacy = raw._inspectionImageLegacyUrl;
  const inspectionImages =
    urls.length > 0 ? urls : legacy ? [legacy] : [];
  return {
    exhibitionImages: raw.exhibitionImages,
    clientVisitImages: raw.clientVisitImages,
    inspectionImages,
  };
}

export async function fetchHomepage(locale: Locale = "en"): Promise<HomepageData | null> {
  try {
    const data = await sanityClient.fetch<
      (Omit<HomepageData, "trustSection"> & { trustSection?: TrustSectionFetched | null }) | null
    >(homepageQuery, { locale }, { next: { revalidate: 60 } });
    if (!data) return null;
    const { trustSection: rawTrust, ...rest } = data;
    return {
      ...rest,
      trustSection: normalizeTrustSection(rawTrust ?? undefined),
    };
  } catch {
    return null;
  }
}

