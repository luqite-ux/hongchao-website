import { sanityClient } from "./sanity.client";
import { productCategoriesQuery, navCategoriesQuery } from "./sanity.queries";

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

export async function fetchProductCategories() {
  try {
    const list = await sanityClient.fetch<ProductCategory[]>(productCategoriesQuery, {}, { next: { revalidate: 60 } });
    return sortBowlFeederFirst(list);
  } catch {
    return [];
  }
}

/** 导航下拉用：按首页「精选分类 featuredCategories」顺序；若未配置则回退为全部分类（振动盘已排第一） */
export async function fetchNavCategories(): Promise<ProductCategory[]> {
  try {
    const data = await sanityClient.fetch<{ featuredCategories?: ProductCategory[] | null }>(
      navCategoriesQuery,
      {},
      { next: { revalidate: 60 } }
    );
    if (data?.featuredCategories?.length) return sortBowlFeederFirst(data.featuredCategories);
    return fetchProductCategories();
  } catch {
    return [];
  }
}
