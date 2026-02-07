/**
 * 将 productCategory 按 title 分组；对 cutoff 之前的旧分类，迁移引用到 cutoff 之后的新分类，再删除旧分类
 * 运行：cd studio && npx sanity exec scripts/merge-delete-categories-before.js --with-user-token
 *      带 --apply 才执行；--cutoff 2026-02-03T16:00:00Z 可覆盖默认时间
 */
const { createClient } = require("@sanity/client");

const args = process.argv.slice(2);
const getArg = (k, d = null) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : d;
};

const APPLY = args.includes("--apply");

// 默认：2026-02-04 00:00 (UTC+8) => 2026-02-03T16:00:00Z
const cutoff = getArg("--cutoff", "2026-02-03T16:00:00Z");

const client = createClient({
  projectId: "rbkc9qwm",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN, // sanity exec --with-user-token 注入
});

function byCreatedAtAsc(a, b) {
  return a._createdAt.localeCompare(b._createdAt);
}

async function fetchProductsByCategoryRef(catId) {
  // 只取 _id，避免拉大字段
  return client.fetch(
    `*[_type=="product" && category._ref==$cid]{_id}`,
    { cid: catId }
  );
}

async function main() {
  console.log(`cutoff (UTC) = ${cutoff}`);
  console.log(APPLY ? "MODE: APPLY ✅" : "MODE: DRY-RUN (no changes) 🧪");

  // 拉取所有分类
  const cats = await client.fetch(
    `*[_type=="productCategory"]{_id,title,_createdAt}`
  );

  // 按 title 分组
  const groups = new Map();
  for (const c of cats) {
    const title = (c.title || "").trim();
    if (!title) continue;
    if (!groups.has(title)) groups.set(title, []);
    groups.get(title).push(c);
  }

  let totalWillDelete = 0;
  let totalWillRepoint = 0;
  let totalTitlesTouched = 0;

  for (const [title, list] of groups.entries()) {
    if (list.length < 2) continue; // 不重复就不处理

    const sorted = [...list].sort(byCreatedAtAsc);
    const oldCats = sorted.filter((c) => c._createdAt < cutoff);
    if (oldCats.length === 0) continue; // 没有"2/4前"的旧分类

    const newCats = sorted.filter((c) => c._createdAt >= cutoff);

    // 选择主分类：优先用 cutoff 之后的最早一条（更像"新规范"）
    const canonical = newCats[0];
    if (!canonical) {
      // 没有新分类：为了不删断引用，直接跳过
      console.log(`\n[SKIP] "${title}" has ${oldCats.length} old categories but NO category created after cutoff. (won't delete)`);
      continue;
    }

    totalTitlesTouched++;
    console.log(`\n[TITLE] ${title}`);
    console.log(` canonical: ${canonical._id} (${canonical._createdAt})`);
    console.log(` oldCount: ${oldCats.length}, newCount: ${newCats.length}`);

    // 对每个旧分类：找出引用它的产品，迁移引用到 canonical，然后删除旧分类
    for (const old of oldCats) {
      const products = await fetchProductsByCategoryRef(old._id);
      const pids = products.map((p) => p._id);

      console.log(`  - old: ${old._id} (${old._createdAt}) referencedBy=${pids.length}`);

      if (pids.length > 0) {
        totalWillRepoint += pids.length;
        if (APPLY) {
          // 逐个 patch（数量不大时最稳；你只有 20 产品，足够）
          for (const pid of pids) {
            await client
              .patch(pid)
              .set({ category: { _type: "reference", _ref: canonical._id } })
              .commit();
          }
        }
      }

      // 删除旧分类（删除前已迁移引用）
      totalWillDelete++;
      if (APPLY) {
        await client.delete(old._id);
      }
    }
  }

  console.log("\n===== SUMMARY =====");
  console.log(`titlesTouched: ${totalTitlesTouched}`);
  console.log(`productsRepointed: ${totalWillRepoint}`);
  console.log(`categoriesDeleted: ${totalWillDelete}`);
  console.log(APPLY ? "✅ Done." : "🧪 Dry-run finished. Re-run with --apply to execute.");
}

main().catch((e) => {
  console.error("❌ failed:", e?.message || e);
  process.exit(1);
});
