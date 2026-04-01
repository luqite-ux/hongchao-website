import { sanityClient } from "./sanity.client";
import { productCategoriesQuery, navCategoriesQuery } from "./sanity.queries";
import type { Locale } from "@/lib/i18n";

export interface ProductCategory {
  _id: string;
  title: string;
  slug: string | null;
  description: string | null;
  image?: { _type: string; asset: { _ref: string } } | null;
}

/** 振动盘优先：把 slug 为 vibration-bowl-feeder 的分类排到最前（阶段三） */
const BOWL_FEEDER_SLUG = "vibration-bowl-feeder";
function sortBowlFeederFirst<T extends { slug?: string | null }>(list: T[]): T[] {
  const rest = list.filter((c) => (c.slug ?? "").toLowerCase() !== BOWL_FEEDER_SLUG);
  const first = list.find((c) => (c.slug ?? "").toLowerCase() === BOWL_FEEDER_SLUG);
  return first ? [first, ...rest] : list;
}

export async function fetchProductCategories(locale: Locale = "en") {
  try {
    const list = await sanityClient.fetch<ProductCategory[]>(
      productCategoriesQuery,
      { locale },
      { next: { revalidate: 60 } }
    );
    return sortBowlFeederFirst(list);
  } catch {
    return [];
  }
}

/**
 * 导航 / 页脚用：与产品列表页一致——先按首页「精选分类」顺序（振动盘在该段内优先），
 * 再把未列入精选的其它 productCategory 自动追加在后。这样后台新建分类不必再手动画进精选也会显示。
 */
export async function fetchNavCategories(locale: Locale = "en"): Promise<ProductCategory[]> {
  try {
    const navData = await sanityClient.fetch<{ featuredCategories?: ProductCategory[] | null }>(
      navCategoriesQuery,
      { locale },
      { next: { revalidate: 60 } }
    );
    const featuredRaw = navData?.featuredCategories?.filter(Boolean) ?? [];
    const allCategories = await fetchProductCategories(locale);

    if (!featuredRaw.length) {
      return allCategories;
    }

    const featured = sortBowlFeederFirst(featuredRaw);
    const featuredIds = new Set(featured.map((c) => c._id));
    const rest = allCategories.filter((c) => !featuredIds.has(c._id));
    return [...featured, ...rest];
  } catch {
    return [];
  }
}
