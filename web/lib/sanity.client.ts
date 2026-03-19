import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // 为了让 Studio 刚发布/刚上传的内容尽快在前台可见，禁用 CDN 缓存。
  // 结合 Next 的 revalidate 控制缓存即可。
  useCdn: false,
  ...(process.env.SANITY_API_READ_TOKEN && { token: process.env.SANITY_API_READ_TOKEN }),
});
