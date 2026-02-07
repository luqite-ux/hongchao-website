/**
 * 把所有 product.category._ref 从 drafts.xxx 迁移为正式 id（xxx）。
 *
 * 环境变量（从 studio 目录执行时会读 studio/.env.local）：
 *   SANITY_API_TOKEN（必填）
 *   SANITY_STUDIO_PROJECT_ID（兼容 NEXT_PUBLIC_SANITY_PROJECT_ID）
 *   SANITY_STUDIO_DATASET（兼容 NEXT_PUBLIC_SANITY_DATASET，默认 production）
 *
 * 在 studio 目录执行：
 *   pnpm exec tsx ../scripts/migrate-product-category-refs.ts
 *   pnpm exec tsx ../scripts/migrate-product-category-refs.ts --apply
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

const PRODUCTS_WITH_DRAFT_CATEGORY_REF = `*[_type == "product" && defined(category._ref) && string::startsWith(category._ref, "drafts.")]{ _id, "ref": category._ref }`;

async function main() {
  requireEnv();
  if (APPLY) console.log("[apply] 将执行写入\n");
  else console.log("[dry-run] 仅打印。加 --apply 执行。\n");

  const client = createClient({
    projectId: PROJECT_ID!,
    dataset: DATASET!,
    apiVersion: "2024-01-01",
    useCdn: false,
    token: TOKEN!,
  });

  type Row = { _id: string; ref: string };
  const products = (await client.fetch<Row[]>(PRODUCTS_WITH_DRAFT_CATEGORY_REF)) ?? [];
  const hitCount = products.length;

  if (hitCount === 0) {
    console.log("命中数量: 0");
    console.log("没有 product 的 category._ref 以 drafts. 开头，无需迁移。");
    return;
  }

  console.log(`命中数量: ${hitCount}`);
  const failures: { _id: string; ref: string; error: string }[] = [];
  let modifiedCount = 0;

  for (const p of products) {
    const canonicalRef = p.ref.replace(/^drafts\./, "");
    if (!APPLY) {
      console.log(`  ${p._id}  category._ref: ${p.ref} -> ${canonicalRef}`);
      continue;
    }
    try {
      await client
        .patch(p._id)
        .set({ category: { _type: "reference", _ref: canonicalRef } })
        .commit();
      modifiedCount++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      failures.push({ _id: p._id, ref: p.ref, error: msg });
    }
  }

  if (APPLY) {
    console.log("修改数量:", modifiedCount);
    if (failures.length > 0) {
      console.log("失败列表:");
      failures.forEach((f) => console.log(`  ${f._id}  ref=${f.ref}  error=${f.error}`));
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
