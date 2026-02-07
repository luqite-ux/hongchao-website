const x = require("xlsx");
const wb = x.readFile("./data/product.xlsx");

const products = x.utils.sheet_to_json(wb.Sheets["products"], { defval: "" });
const images = x.utils.sheet_to_json(wb.Sheets["images"], { defval: "" });

const folderToSlug = {};
for (const p of products) {
  const folder = String(p.image_folder_name || "").padStart(2, "0");
  const slug = String(p.slug || "");
  if (folder && folder !== "00" && slug) folderToSlug[folder] = slug;
}

let filled = 0;
for (const img of images) {
  const f = String(img.image_folder_name || "").padStart(2, "0");
  const s = folderToSlug[f] || "";
  img.product_slug = s;
  if (s) filled++;
}

wb.Sheets["images"] = x.utils.json_to_sheet(images);
x.writeFile(wb, "./data/product.fixed.xlsx");

console.log("✔ 已生成 data/product.fixed.xlsx");
console.log("products =", products.length, "images =", images.length, "filled product_slug =", filled);
