/**
 * 合并同名的 productCategory：将重复分类的引用统一到主分类，再删除旧分类
 * 运行：cd studio && npx sanity exec scripts/merge-duplicate-categories.js --with-user-token
 */
const { createClient } = require("@sanity/client");
const slugify = require("slugify");

const client = createClient({
  projectId: "rbkc9qwm",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
});

/** 选主分类：优先 slug 与 title 规范形式一致的，否则选 _id 最短的 */
function pickPrimary(categories, title) {
  const canonicalSlug = slugify(title, { lower: true, strict: true });
  const withCanonicalSlug = categories.filter(
    (c) => (c.slug || "") === canonicalSlug
  );
  if (withCanonicalSlug.length > 0) {
    return withCanonicalSlug[0];
  }
  return [...categories].sort((a, b) => a._id.length - b._id.length)[0];
}

async function main() {
  const categories = await client.fetch(`
    *[_type == "productCategory"]{
      _id,
      title,
      "slug": slug.current
    }
  `);

  const byTitle = new Map();
  for (const c of categories) {
    const t = c.title || "";
    if (!byTitle.has(t)) byTitle.set(t, []);
    byTitle.get(t).push(c);
  }

  const toMerge = [];
  for (const [title, list] of byTitle) {
    if (list.length <= 1) continue;
    const primary = pickPrimary(list, title);
    const others = list.filter((c) => c._id !== primary._id);
    toMerge.push({ title, primary, others });
  }

  if (!toMerge.length) {
    console.log("✅ No duplicate categories found.");
    return;
  }

  // 查询每个待合并分类被多少 product 引用
  const productCountByOldId = new Map();
  for (const { others } of toMerge) {
    for (const old of others) {
      const count = await client.fetch(
        `count(*[_type == "product" && category._ref == $ref])`,
        { ref: old._id }
      );
      productCountByOldId.set(old._id, count);
    }
  }

  console.log("⚠️ 将被合并的分类和受影响的 product 数量：\n");
  let totalAffected = 0;
  for (const { title, primary, others } of toMerge) {
    let affected = 0;
    const lines = [`「${title}」→ 主分类: ${primary._id}`];
    for (const old of others) {
      const n = productCountByOldId.get(old._id) || 0;
      affected += n;
      lines.push(`  - 合并并删除: ${old._id} (影响 ${n} 个 product)`);
    }
    totalAffected += affected;
    console.log(lines.join("\n") + "\n");
  }
  console.log(`合计影响 ${totalAffected} 个 product\n`);

  // 执行：先更新 product，再删除旧分类
  for (const { primary, others } of toMerge) {
    for (const old of others) {
      const productIds = await client.fetch(
        `*[_type == "product" && category._ref == $ref]._id`,
        { ref: old._id }
      );
      for (const pid of productIds) {
        await client
          .patch(pid)
          .set({ category: { _type: "reference", _ref: primary._id } })
          .commit();
      }
      const refCount = await client.fetch(
        `count(*[references($id)])`,
        { id: old._id }
      );
      if (refCount > 0) {
        console.log(
          `⚠️ 跳过删除 ${old._id}：仍有 ${refCount} 处引用，请检查后重试`
        );
        continue;
      }
      console.log(`🗑 Deleting: ${old._id}`);
      await client.delete(old._id);
    }
  }

  console.log("✅ Merge completed.");
}

main().catch((err) => {
  console.error("❌ Merge failed:", err?.message || err);
  process.exit(1);
});
