import { groq } from "next-sanity";

/** 首页单例数据：hero、stats、featuredCategories、featuredProducts */
export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    hero{
      eyebrow,
      title,
      subtitle,
      image,
      ctaPrimary{ text, href },
      ctaSecondary{ text, href }
    },
    "featuredCategories": featuredCategories[]->{
      _id,
      title,
      "slug": slug.current,
      description,
      image
    },
    "featuredProducts": featuredProducts[]->{
      _id,
      title,
      "excerpt": summary,
      "slug": slug.current,
      "mainImage": heroImage,
      "category": category->{
        title,
        "slug": slug.current
      }
    },
    stats[]{ value, label }
  }
`;
