/**
 * 清理 product 文档中的未知字段（schema 未定义的历史遗留字段），消除 Studio 底部 "Unknown fields found"。
 *
 * 与 studio/schemaTypes/product.ts 中定义的字段对比，删除文档里多出的键。
 *
 * 环境变量（从 repo 根或 studio 目录执行）：
 *   SANITY_API_TOKEN（必填）
 *   SANITY_STUDIO_PROJECT_ID / NEXT_PUBLIC_SANITY_PROJECT_ID
 *   SANITY_STUDIO_DATASET / NEXT_PUBLIC_SANITY_DATASET（默认 production）
 *
 * 用法：
 *   pnpm exec tsx scripts/clean-product-unknown-fields.ts          # 仅列出未知字段
 *   pnpm exec tsx scripts/clean-product-unknown-fields.ts --apply  # 执行 patch 删除
 */
import fs from "fs";
import path from "path";
const { createClient } = require("@sanity/client");

function loadEnv(dir: string): void {
  const envPath = path.join(dir, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
    }
  }
}
loadEnv(process.cwd());
loadEnv(path.resolve(process.cwd(), ".."));
loadEnv(path.resolve(process.cwd(), "studio"));

const PROJECT_ID =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID;
const DATASET =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  "production";
const TOKEN = process.env.SANITY_API_TOKEN;

const APPLY = process.argv.includes("--apply");

// 与 studio/schemaTypes/product.ts 保持一致
const PRODUCT_SCHEMA_KEYS = new Set([
  "title",
  "slug",
  "category",
  "heroImage",
  "galleryImages",
  "summary",
  "content",
  "gallery",
  "specs",
  "faq",
  "seo",
]);

const SYSTEM_KEYS = new Set(["_id", "_type", "_rev", "_createdAt", "_updatedAt"]);

function isAllowedKey(key: string): boolean {
  return SYSTEM_KEYS.has(key) || PRODUCT_SCHEMA_KEYS.has(key);
}

function requireEnv(): void {
  const missing: string[] = [];
  if (!PROJECT_ID) missing.push("SANITY_STUDIO_PROJECT_ID / NEXT_PUBLIC_SANITY_PROJECT_ID");
  if (!DATASET) missing.push("SANITY_STUDIO_DATASET / NEXT_PUBLIC_SANITY_DATASET");
  if (!TOKEN) missing.push("SANITY_API_TOKEN");
  if (missing.length > 0) {
    console.error("缺少环境变量：", missing.join(", "));
    process.exit(1);
  }
}

// 拉取完整文档（含所有存储的键）
const ALL_PRODUCTS_QUERY = `*[_type == "product"]`;

async function main() {
  requireEnv();
  if (APPLY) console.log("[apply] 将执行 patch 删除未知字段\n");
  else console.log("[dry-run] 仅列出未知字段。加 --apply 执行删除。\n");

  const client = createClient({
    projectId: PROJECT_ID!,
    dataset: DATASET!,
    apiVersion: "2024-01-01",
    useCdn: false,
    token: TOKEN!,
  });

  type Doc = Record<string, unknown>;
  const products = (await client.fetch<Doc[]>(ALL_PRODUCTS_QUERY)) ?? [];
  let totalUnknown = 0;
  const failures: { _id: string; error: string }[] = [];

  for (const doc of products) {
    const id = doc._id as string;
    const keys = Object.keys(doc);
    const unknown = keys.filter((k) => !isAllowedKey(k));
    if (unknown.length === 0) continue;

    totalUnknown += unknown.length;
    console.log(`文档 ${id}: 未知字段 ${unknown.join(", ")}`);

    if (!APPLY) continue;

    try {
      await client.patch(id).unset(unknown).commit();
      console.log(`  -> 已删除: ${unknown.join(", ")}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      failures.push({ _id: id, error: msg });
      console.error(`  -> 失败: ${msg}`);
    }
  }

  if (totalUnknown === 0 && products.length > 0) {
    console.log("未发现未知字段，无需清理。");
  } else if (totalUnknown === 0) {
    console.log("当前无 product 文档。");
  } else if (!APPLY) {
    console.log(`\n共 ${totalUnknown} 个未知字段。执行: pnpm exec tsx scripts/clean-product-unknown-fields.ts --apply`);
  }

  if (failures.length > 0) {
    console.error("\n失败:", failures.length, "个文档");
    process.exit(1);
  }

  if (APPLY && totalUnknown > 0) {
    console.log("\n提示：patch 已写入草稿。请在 Studio 中发布已修改的产品文档，使线上数据生效。");
  }
}

main();
