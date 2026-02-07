/**
 * 按 productCategory.slug.current 去重，保留 _createdAt 最新的一条，其余迁移 product 引用后删除。
 * 仅处理 _type=="productCategory" 与 _type=="product"。
 *
 * 运行命令示例（在仓库根目录执行）：
 *   cd studio && pnpm exec tsx ../scripts/dedupe-categories.ts
 *   cd studio && pnpm exec tsx ../scripts/dedupe-categories.ts --apply
 *
 * 环境变量（从环境读取，也可在 studio/.env.local 中配置后由 shell 加载）：
 *   SANITY_API_TOKEN（必填）
 *   SANITY_STUDIO_PROJECT_ID / NEXT_PUBLIC_SANITY_PROJECT_ID
 *   SANITY_STUDIO_DATASET / NEXT_PUBLIC_SANITY_DATASET（默认 production）
 */
import fs from "fs";
import path from "path";
// scripts/dedupe-categories.ts
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
  process.env.SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET =
  process.env.SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";
const TOKEN = process.env.SANITY_API_TOKEN;

const APPLY = process.argv.includes("--apply");

function requireEnv(): void {
  const missing: string[] = [];
  if (!PROJECT_ID) missing.push("SANITY_PROJECT_ID / SANITY_STUDIO_PROJECT_ID / NEXT_PUBLIC_SANITY_PROJECT_ID");
  if (!DATASET) missing.push("SANITY_DATASET / SANITY_STUDIO_DATASET / NEXT_PUBLIC_SANITY_DATASET");
  if (!TOKEN) missing.push("SANITY_API_TOKEN");
  if (missing.length > 0) {
    console.error("缺少环境变量：");
    missing.forEach((m) => console.error("  -", m));
    process.exit(1);
  }
}

type CategoryDoc = { _id: string; slug: string | null; _createdAt: string };

const CATEGORIES_QUERY = `*[_type == "productCategory"]{ _id, "slug": slug.current, _createdAt }`;
const PRODUCTS_BY_CATEGORY_REF_QUERY = `*[_type == "product" && category._ref == $oldId]{ _id }`;

function toRef(id: string): string {
  return id.startsWith("drafts.") ? id.slice("drafts.".length) : id;
}

async function main() {
  requireEnv();
  if (APPLY) {
    console.log("[apply] 将执行写入与删除\n");
  } else {
    console.log("[dry-run] 仅打印，不写入。加 --apply 执行。\n");
  }

  const client = createClient({
    projectId: PROJECT_ID!,
    dataset: DATASET!,
    apiVersion: "2024-01-01",
    useCdn: false,
    token: TOKEN!,
  });

  const categories = (await client.fetch<CategoryDoc[]>(CATEGORIES_QUERY)) ?? [];
  const bySlug = new Map<string, CategoryDoc[]>();
  for (const c of categories) {
    const slug = c.slug ?? "";
    if (!bySlug.has(slug)) bySlug.set(slug, []);
    bySlug.get(slug)!.push(c);
  }

  const toKeep: { slug: string; keepId: string }[] = [];
  const toRemove: { slug: string; oldId: string }[] = [];
  const migrations: { oldId: string; keepRef: string; productIds: string[] }[] = [];

  for (const [slug, list] of bySlug.entries()) {
    if (slug === "" || list.length <= 1) continue;
    const sorted = [...list].sort(
      (a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    );
    const [keep, ...old] = sorted;
    const keepRef = toRef(keep._id);
    toKeep.push({ slug, keepId: keep._id });
    for (const o of old) {
      toRemove.push({ slug, oldId: o._id });
      const productIds =
        (await client.fetch<{ _id: string }[]>(PRODUCTS_BY_CATEGORY_REF_QUERY, {
          oldId: o._id,
        })) ?? [];
      migrations.push({
        oldId: o._id,
        keepRef,
        productIds: productIds.map((p) => p._id),
      });
    }
  }

  if (toKeep.length === 0 && toRemove.length === 0) {
    console.log("未发现重复分类（同一 slug 多条），无需处理。");
    return;
  }

  console.log("本次去重保留的分类（slug, keepId）：");
  for (const { slug, keepId } of toKeep) {
    console.log(`  ${slug}  ->  ${keepId}`);
  }
  console.log("\n将删除的旧分类（slug, oldId）：");
  for (const { slug, oldId } of toRemove) {
    console.log(`  ${slug}  ->  ${oldId}`);
  }

  let totalMigrated = 0;
  for (const m of migrations) {
    totalMigrated += m.productIds.length;
    if (m.productIds.length > 0) {
      console.log(
        `\n引用旧分类 ${m.oldId} 的 product：${m.productIds.length} 个，将改为 ${m.keepRef}`
      );
      if (APPLY) {
        for (const pid of m.productIds) {
          await client
            .patch(pid)
            .set({ category: { _type: "reference", _ref: m.keepRef } })
            .commit();
        }
      }
    }
    if (APPLY) {
      await client.delete(m.oldId);
    }
  }

  console.log("\n迁移的 product 引用总数：", totalMigrated);

  if (APPLY) {
    console.log("\n已执行：product 引用已更新，旧分类已删除。");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
