import { groq } from "next-sanity";

/** 首页单例数据：hero、stats、featuredCategories、featuredProducts */
export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    hero{
      "eyebrow": select(
        $locale == "de" => coalesce(eyebrow_de, eyebrow),
        $locale == "es" => coalesce(eyebrow_es, eyebrow),
        eyebrow
      ),
      "title": select(
        $locale == "de" => coalesce(title_de, title),
        $locale == "es" => coalesce(title_es, title),
        title
      ),
      "subtitle": select(
        $locale == "de" => coalesce(subtitle_de, subtitle),
        $locale == "es" => coalesce(subtitle_es, subtitle),
        subtitle
      ),
      image,
      ctaPrimary{
        "text": select(
          $locale == "de" => coalesce(text_de, text),
          $locale == "es" => coalesce(text_es, text),
          text
        ),
        href
      },
      ctaSecondary{
        "text": select(
          $locale == "de" => coalesce(text_de, text),
          $locale == "es" => coalesce(text_es, text),
          text
        ),
        href
      }
    },
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
    },
    "featuredProducts": featuredProducts[]->{
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
    },
    "stats": stats[]{
      value,
      "label": select(
        $locale == "de" => coalesce(label_de, label),
        $locale == "es" => coalesce(label_es, label),
        label
      )
    },
    trustSection{
      "exhibitionImages": exhibitionImages[].asset->url,
      "clientVisitImages": clientVisitImages[].asset->url,
      "inspectionImages": inspectionImages[].asset->url,
      "_inspectionImageLegacyUrl": inspectionImage.asset->url
    },
    aboutSection{
      "videoUrl": videoFile.asset->url,
      poster
    },
    "testimonials": testimonials[]{
      _key,
      quote,
      name,
      title,
      company,
      country,
      focus
    }
  }
`;
