import { sanityClient } from "./sanity.client";
import { productCategoriesQuery, navCategoriesQuery } from "./sanity.queries";

export interface ProductCategory {
  _id: string;
  title: string;
  slug: string | null;
  description: string | null;
  image?: { _type: string; asset: { _ref: string } } | null;
}

export async function fetchProductCategories() {
  return sanityClient.fetch<ProductCategory[]>(productCategoriesQuery, {}, { next: { revalidate: 60 } });
}

/** 导航下拉用：按首页「精选分类 featuredCategories」顺序；若未配置则回退为全部分类按 title 排序 */
export async function fetchNavCategories(): Promise<ProductCategory[]> {
  const data = await sanityClient.fetch<{ featuredCategories?: ProductCategory[] | null }>(
    navCategoriesQuery,
    {},
    { next: { revalidate: 60 } }
  );
  if (data?.featuredCategories?.length) return data.featuredCategories;
  return fetchProductCategories();
}
