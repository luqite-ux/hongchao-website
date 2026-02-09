import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    companyName,
    logo,
    contact{
      phone,
      email,
      address,
      wechat
    },
    defaultSeo{
      title,
      description,
      ogImage
    }
  }
`;

export const productCategoriesQuery = groq`
  *[_type == "productCategory"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    image
  }
`;

/** 导航下拉用：按首页「精选分类」顺序，带 description；为空则需回退到 productCategoriesQuery */
export const navCategoriesQuery = groq`
  *[_type == "homepage"][0]{
    "featuredCategories": featuredCategories[]->{
      _id,
      title,
      "slug": slug.current,
      description,
      image
    }
  }
`;

// 产品列表用：_id, title, excerpt(summary), slug, mainImage(heroImage), category
export const productsQuery = groq`
  *[_type == "product"] | order(title asc) {
    _id,
    title,
    "excerpt": summary,
    "slug": slug.current,
    "mainImage": heroImage,
    "category": category->{
      title,
      "slug": slug.current
    }
  }
`;

// 某分类 + 该分类下产品列表。products 子查询按 category._ref 匹配，兼容指向正式 id 或 drafts id 的引用，确保显示该分类下所有已发布产品
export const productsByCategorySlugQuery = groq`
  *[_type == "productCategory" && slug.current == $category][0]{
    title,
    description,
    "slug": slug.current,
    "products": *[_type == "product" && (category._ref == ^._id || category._ref == "drafts."+^._id)] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      "excerpt": summary,
      "mainImage": heroImage
    }
  }
`;

// 按 category slug + product slug 取单品详情；画廊仅用主图 + 产品图集；视频支持本地上传或 YouTube/Vimeo
export const productBySlugsQuery = groq`
  *[_type == "product" && slug.current == $product && category->slug.current == $category][0]{
    _id,
    title,
    "excerpt": summary,
    "mainImage": heroImage,
    "gallery": galleryImages,
    "body": content,
    applications { partType, feedingBehavior, application },
    specs,
    "category": category->{
      title,
      "slug": slug.current
    },
    "video": video->{
      _id,
      title,
      source,
      "videoId": videoId,
      "url": url,
      "videoFileUrl": videoFile.asset->url,
      "videoFileAsset": videoFile.asset->{ url },
      coverImage,
      description
    }
  }
`;

// 专利列表：按 order 升序，_createdAt 降序兜底（含专利图片）
export const patentsQuery = groq`
  *[_type == "patent"] | order(order asc, _createdAt desc) {
    _id,
    title,
    patentNo,
    category,
    image
  }
`;

// 同分类下 3–4 个产品（排除当前产品）
export const relatedProductsQuery = groq`
  *[_type == "product" && category->slug.current == $category && _id != $excludeId][0...3]{
    _id,
    title,
    "excerpt": summary,
    "slug": slug.current,
    "mainImage": heroImage,
    "category": category->{
      title,
      "slug": slug.current
    }
  }
`;
