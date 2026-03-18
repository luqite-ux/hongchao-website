import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    companyName,
    logo,
    logoSmall,
    contact{
      phone,
      email,
      address,
      wechat
    },
    social{
      linkedin,
      tiktok,
      youtube,
      facebook,
      twitter
    },
    defaultSeo{
      "title": select(
        $locale == "de" => coalesce(title_de, title),
        $locale == "es" => coalesce(title_es, title),
        title
      ),
      "description": select(
        $locale == "de" => coalesce(description_de, description),
        $locale == "es" => coalesce(description_es, description),
        description
      ),
      ogImage
    }
  }
`;

export const productCategoriesQuery = groq`
  *[_type == "productCategory"] | order(title asc) {
    _id,
    "title": select(
      $locale == "de" => coalesce(title_de, title),
      $locale == "es" => coalesce(title_es, title),
      title
    ),
    "slug": slug.current,
    "description": select(
      $locale == "de" => coalesce(description_de, description),
      $locale == "es" => coalesce(description_es, description),
      description
    ),
    image
  }
`;

/** 导航下拉用：按首页「精选分类」顺序，带 description；为空则需回退到 productCategoriesQuery */
export const navCategoriesQuery = groq`
  *[_type == "homepage"][0]{
    "featuredCategories": featuredCategories[]->{
      _id,
      "title": select(
        $locale == "de" => coalesce(title_de, title),
        $locale == "es" => coalesce(title_es, title),
        title
      ),
      "slug": slug.current,
      "description": select(
        $locale == "de" => coalesce(description_de, description),
        $locale == "es" => coalesce(description_es, description),
        description
      ),
      image
    }
  }
`;

// 产品列表用：_id, title, excerpt(summary), slug, mainImage(heroImage), category
export const productsQuery = groq`
  *[_type == "product"] | order(title asc) {
    _id,
    "title": select(
      $locale == "de" => coalesce(title_de, title),
      $locale == "es" => coalesce(title_es, title),
      title
    ),
    "excerpt": select(
      $locale == "de" => coalesce(summary_de, summary),
      $locale == "es" => coalesce(summary_es, summary),
      summary
    ),
    "slug": slug.current,
    "mainImage": heroImage,
    "category": category->{
      "title": select(
        $locale == "de" => coalesce(title_de, title),
        $locale == "es" => coalesce(title_es, title),
        title
      ),
      "slug": slug.current
    }
  }
`;

// 某分类 + 该分类下产品列表。products 子查询按 category._ref 匹配，兼容指向正式 id 或 drafts id 的引用，确保显示该分类下所有已发布产品
export const productsByCategorySlugQuery = groq`
  *[_type == "productCategory" && slug.current == $category][0]{
    "title": select(
      $locale == "de" => coalesce(title_de, title),
      $locale == "es" => coalesce(title_es, title),
      title
    ),
    "description": select(
      $locale == "de" => coalesce(description_de, description),
      $locale == "es" => coalesce(description_es, description),
      description
    ),
    "slug": slug.current,
    "products": *[_type == "product" && (category._ref == ^._id || category._ref == "drafts."+^._id)] | order(title asc) {
      _id,
      "title": select(
        $locale == "de" => coalesce(title_de, title),
        $locale == "es" => coalesce(title_es, title),
        title
      ),
      "slug": slug.current,
      "excerpt": select(
        $locale == "de" => coalesce(summary_de, summary),
        $locale == "es" => coalesce(summary_es, summary),
        summary
      ),
      "mainImage": heroImage
    }
  }
`;

// 按 category slug + product slug 取单品详情；画廊仅用主图 + 产品图集；视频支持本地上传或 YouTube/Vimeo
export const productBySlugsQuery = groq`
  *[_type == "product" && slug.current == $product && category->slug.current == $category][0]{
    _id,
    "title": select(
      $locale == "de" => coalesce(title_de, title),
      $locale == "es" => coalesce(title_es, title),
      title
    ),
    "excerpt": select(
      $locale == "de" => coalesce(summary_de, summary),
      $locale == "es" => coalesce(summary_es, summary),
      summary
    ),
    "mainImage": heroImage,
    "gallery": galleryImages,
    "engineeringImage": engineeringImage,
    "technicalImages": technicalImages,
    "packagingImage": packagingImage,
    "body": select(
      $locale == "de" => coalesce(content_de, content),
      $locale == "es" => coalesce(content_es, content),
      content
    ),
    applications { partType, feedingBehavior, application },
    specs,
    "cases": cases[]{
      industry,
      image
    },
    "category": category->{
      "title": select(
        $locale == "de" => coalesce(title_de, title),
        $locale == "es" => coalesce(title_es, title),
        title
      ),
      "slug": slug.current
    },
    "video": video->{
      _id,
      "title": select(
        $locale == "de" => coalesce(title_de, title),
        $locale == "es" => coalesce(title_es, title),
        title
      ),
      source,
      "videoId": videoId,
      "url": url,
      "videoFileUrl": videoFile.asset->url,
      "videoFileAsset": videoFile.asset->{ url },
      coverImage,
      "description": select(
        $locale == "de" => coalesce(description_de, description),
        $locale == "es" => coalesce(description_es, description),
        description
      )
    }
  }
`;

// 视频列表（/videos 页）：按标题排序，含本地上传/URL/YouTube/Vimeo 播放所需字段
export const videosQuery = groq`
  *[_type == "video"] | order(title asc) {
    _id,
    "title": select(
      $locale == "de" => coalesce(title_de, title),
      $locale == "es" => coalesce(title_es, title),
      title
    ),
    "description": select(
      $locale == "de" => coalesce(description_de, description),
      $locale == "es" => coalesce(description_es, description),
      description
    ),
    source,
    "videoId": videoId,
    "url": url,
    "videoFileUrl": videoFile.asset->url,
    coverImage
  }
`;

// 专利列表：按 order 升序，_createdAt 降序兜底（含专利图片）
export const patentsQuery = groq`
  *[_type == "patent"] | order(order asc, _createdAt desc) {
    _id,
    "title": select(
      $locale == "de" => coalesce(title_de, title),
      $locale == "es" => coalesce(title_es, title),
      title
    ),
    patentNo,
    category,
    image
  }
`;

// 同分类下 3–4 个产品（排除当前产品）
export const relatedProductsQuery = groq`
  *[_type == "product" && category->slug.current == $category && _id != $excludeId][0...3]{
    _id,
    "title": select(
      $locale == "de" => coalesce(title_de, title),
      $locale == "es" => coalesce(title_es, title),
      title
    ),
    "excerpt": select(
      $locale == "de" => coalesce(summary_de, summary),
      $locale == "es" => coalesce(summary_es, summary),
      summary
    ),
    "slug": slug.current,
    "mainImage": heroImage,
    "category": category->{
      "title": select(
        $locale == "de" => coalesce(title_de, title),
        $locale == "es" => coalesce(title_es, title),
        title
      ),
      "slug": slug.current
    }
  }
`;

// Resources（docPage）列表：按更新时间倒序
export const docPagesQuery = groq`
  *[_type == "docPage"] | order(updatedAt desc, _updatedAt desc) {
    _id,
    "title": select(
      $locale == "de" => coalesce(title_de, title),
      $locale == "es" => coalesce(title_es, title),
      title
    ),
    "slug": slug.current,
    category,
    "summary": select(
      $locale == "de" => coalesce(summary_de, summary),
      $locale == "es" => coalesce(summary_es, summary),
      summary
    ),
    updatedAt,
    "fileUrl": file.asset->url
  }
`;

export const docPageBySlugQuery = groq`
  *[_type == "docPage" && slug.current == $slug][0]{
    _id,
    "title": select(
      $locale == "de" => coalesce(title_de, title),
      $locale == "es" => coalesce(title_es, title),
      title
    ),
    "slug": slug.current,
    category,
    "summary": select(
      $locale == "de" => coalesce(summary_de, summary),
      $locale == "es" => coalesce(summary_es, summary),
      summary
    ),
    updatedAt,
    "fileUrl": file.asset->url,
    "content": select(
      $locale == "de" => coalesce(content_de, content),
      $locale == "es" => coalesce(content_es, content),
      content
    ),
    seo{
      "title": select(
        $locale == "de" => coalesce(title_de, title),
        $locale == "es" => coalesce(title_es, title),
        title
      ),
      "description": select(
        $locale == "de" => coalesce(description_de, description),
        $locale == "es" => coalesce(description_es, description),
        description
      ),
      ogImage
    }
  }
`;

// Blog（post）列表：按发布时间倒序
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc, _createdAt desc) {
    _id,
    "title": select(
      $locale == "de" => coalesce(title_de, title),
      $locale == "es" => coalesce(title_es, title),
      title
    ),
    "slug": slug.current,
    "excerpt": select(
      $locale == "de" => coalesce(excerpt_de, excerpt),
      $locale == "es" => coalesce(excerpt_es, excerpt),
      excerpt
    ),
    publishedAt,
    coverImage
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    "title": select(
      $locale == "de" => coalesce(title_de, title),
      $locale == "es" => coalesce(title_es, title),
      title
    ),
    "slug": slug.current,
    "excerpt": select(
      $locale == "de" => coalesce(excerpt_de, excerpt),
      $locale == "es" => coalesce(excerpt_es, excerpt),
      excerpt
    ),
    publishedAt,
    coverImage,
    "content": select(
      $locale == "de" => coalesce(content_de, content),
      $locale == "es" => coalesce(content_es, content),
      content
    ),
    seo{
      "title": select(
        $locale == "de" => coalesce(title_de, title),
        $locale == "es" => coalesce(title_es, title),
        title
      ),
      "description": select(
        $locale == "de" => coalesce(description_de, description),
        $locale == "es" => coalesce(description_es, description),
        description
      ),
      ogImage
    }
  }
`;

// FAQ：允许只维护一个页面（取第一条）
export const faqPageQuery = groq`
  *[_type == "faqPage"] | order(_updatedAt desc)[0]{
    _id,
    "title": select(
      $locale == "de" => coalesce(title_de, title),
      $locale == "es" => coalesce(title_es, title),
      title
    ),
    "slug": slug.current,
    "items": select(
      $locale == "de" => coalesce(items_de, items),
      $locale == "es" => coalesce(items_es, items),
      items
    )[]{
      _key,
      question,
      answer
    },
    seo{
      "title": select(
        $locale == "de" => coalesce(title_de, title),
        $locale == "es" => coalesce(title_es, title),
        title
      ),
      "description": select(
        $locale == "de" => coalesce(description_de, description),
        $locale == "es" => coalesce(description_es, description),
        description
      ),
      ogImage
    }
  }
`;

export const simplePageBySlugQuery = groq`
  *[_type == "simplePage" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    section,
    summary,
    updatedAt,
    content,
    seo{
      title,
      description,
      ogImage
    }
  }
`;
