import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity.queries";
import { groq } from "next-sanity";

/**
 * GET /api/sanity-check
 * 用于验证前端与 Sanity 后端是否对齐：
 * - 环境变量 projectId / dataset 是否与 Studio 一致
 * - 能否成功拉取 siteSettings
 * - 返回数据结构是否与 schema 一致
 * - product / productCategory 数量
 */
export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

  if (!projectId || !dataset) {
    return NextResponse.json(
      {
        ok: false,
        error: "缺少环境变量",
        hint: "请在 .env.local 中设置 NEXT_PUBLIC_SANITY_PROJECT_ID 和 NEXT_PUBLIC_SANITY_DATASET",
        expected: {
          projectId: "与 Studio sanity.config.ts 中的 projectId 一致（如 rbkc9qwm）",
          dataset: "与 Studio 中的 dataset 一致（如 production）",
        },
      },
      { status: 400 }
    );
  }

  try {
    const [siteSettings, productCount, categoryCount] = await Promise.all([
      sanityClient.fetch(siteSettingsQuery),
      sanityClient.fetch<number>(groq`count(*[_type == "product"])`),
      sanityClient.fetch<number>(groq`count(*[_type == "productCategory"])`),
    ]);

    // 与 schema 对齐的字段检查（siteSettings 文档类型）
    const expectedFields = [
      "companyName",
      "logo",
      "contact",
      "defaultSeo",
    ] as const;
    const hasContact = siteSettings?.contact != null;
    const contactFields = hasContact
      ? ["phone", "email", "address", "wechat"].filter(
          (f) => f in (siteSettings.contact || {})
        )
      : [];
    const hasSeo = siteSettings?.defaultSeo != null;
    const seoFields = hasSeo
      ? ["title", "description", "ogImage"].filter(
          (f) => f in (siteSettings.defaultSeo || {})
        )
      : [];

    const schemaAligned =
      expectedFields.every((f) => f in (siteSettings || {})) &&
      (contactFields.length === 4 || !hasContact) &&
      (seoFields.length === 3 || !hasSeo);

    return NextResponse.json({
      ok: true,
      message: "前端与 Sanity 后端已对齐",
      config: {
        projectId,
        dataset,
        apiVersion,
      },
      productCount: productCount ?? 0,
      categoryCount: categoryCount ?? 0,
      sanityStudioMatch: {
        projectId: projectId === "rbkc9qwm" ? "与当前 Studio 一致" : "请核对 Studio sanity.config.ts",
        dataset: dataset === "production" ? "与当前 Studio 一致" : "请核对 Studio",
      },
      siteSettings: siteSettings
        ? {
            hasData: true,
            schemaAligned,
            fields: {
              topLevel: expectedFields.filter((f) => siteSettings && f in siteSettings),
              contact: hasContact ? contactFields : [],
              defaultSeo: hasSeo ? seoFields : [],
            },
            // 返回部分数据便于肉眼核对，不暴露敏感信息
            preview: {
              companyName: siteSettings.companyName ?? null,
              hasLogo: !!siteSettings.logo,
              hasContact: hasContact,
              hasDefaultSeo: hasSeo,
            },
          }
        : {
            hasData: false,
            hint: "Studio 中尚未创建或发布「站点设置」文档，请在 Sanity Studio 中创建并发布一条 siteSettings 文档",
          },
    });
  } catch (e) {
    console.error(e);
    console.error("代理环境变量:", {
      HTTP_PROXY: !!process.env.HTTP_PROXY,
      HTTPS_PROXY: !!process.env.HTTPS_PROXY,
      ALL_PROXY: !!process.env.ALL_PROXY,
      NO_PROXY: !!process.env.NO_PROXY,
    });
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      {
        ok: false,
        error: "请求 Sanity 失败",
        detail: message,
        hint: "请确认 projectId、dataset、CORS 与网络是否正常；若 Studio 与前端用不同 projectId/dataset，请统一",
      },
      { status: 502 }
    );
  }
}
