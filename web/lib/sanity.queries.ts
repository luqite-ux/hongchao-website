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
