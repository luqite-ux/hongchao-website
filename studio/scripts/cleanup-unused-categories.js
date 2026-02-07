/**
 * 删除未被任何 product 引用的 productCategory（孤儿分类）
 * 运行：cd studio && npx sanity exec scripts/cleanup-unused-categories.js --with-user-token
 */
const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "rbkc9qwm",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN, // sanity exec --with-user-token 注入
});

async function main() {
  // 只找"孤儿分类"：没有任何 product 引用它
  const unused = await client.fetch(`
    *[_type == "productCategory" && !(_id in *[_type=="product"].category._ref)]{
      _id,
      title
    }
  `);

  if (!unused.length) {
    console.log("✅ No unused categories found.");
    return;
  }

  console.log(`⚠️ Found ${unused.length} unused categories (will delete):`);
  for (const c of unused) {
    console.log(`  - ${c.title} (${c._id})`);
  }

  for (const c of unused) {
    console.log(`🗑 Deleting: ${c.title} (${c._id})`);
    await client.delete(c._id);
  }

  console.log("✅ Cleanup completed.");
}

main().catch((err) => {
  console.error("❌ Cleanup failed:", err?.message || err);
  process.exit(1);
});
