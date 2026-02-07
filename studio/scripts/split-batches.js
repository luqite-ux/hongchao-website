const fs = require("fs");
const path = require("path");
const x = require("xlsx");

function pad2(v){ return String(v||"").padStart(2,"0"); }

const src = "./data/product.xlsx";
const outDir = "./data/batches";
const batchSize = 3;

if (!fs.existsSync(src)) throw new Error("找不到 " + src);
fs.mkdirSync(outDir, { recursive: true });

const wb = x.readFile(src);
const productsSheet = wb.Sheets["products"];
const imagesSheet = wb.Sheets["images"];
const categoriesSheet = wb.Sheets["productCategories"];
const helpSheet = wb.Sheets["批量导入产品表格填写说明"];

const products = x.utils.sheet_to_json(productsSheet, { defval: "" });
const images = x.utils.sheet_to_json(imagesSheet, { defval: "" });

if (!products.length) throw new Error("products 为空");
if (!images.length) console.warn("images 为空（不影响拆批，但导入会无图）");

const folders = [...new Set(products.map(p => pad2(p.image_folder_name)).filter(f => f && f !== "00"))].sort();
const folderToProduct = {};
for (const p of products) folderToProduct[pad2(p.image_folder_name)] = p;

const chunks = [];
for (let i=0;i<folders.length;i+=batchSize){
  chunks.push(folders.slice(i, i+batchSize));
}

let idx = 1;
for (const chunkFolders of chunks){
  const outWb = x.utils.book_new();

  const outProducts = chunkFolders.map(f => folderToProduct[f]).filter(Boolean);

  // images 保留只属于本批产品文件夹的图片（更稳更快）
  const folderSet = new Set(chunkFolders);
  const outImages = images.filter(img => folderSet.has(pad2(img.image_folder_name)));

  x.utils.book_append_sheet(outWb, x.utils.json_to_sheet(outProducts), "products");
  x.utils.book_append_sheet(outWb, x.utils.json_to_sheet(outImages), "images");

  if (categoriesSheet) x.utils.book_append_sheet(outWb, categoriesSheet, "productCategories");
  if (helpSheet) x.utils.book_append_sheet(outWb, helpSheet, "批量导入产品表格填写说明");

  const name = `product.batch-${String(idx).padStart(2,"0")}.xlsx`;
  const outPath = path.join(outDir, name);
  x.writeFile(outWb, outPath);

  console.log(`✔ 生成 ${outPath} | products=${outProducts.length} images=${outImages.length} folders=${chunkFolders.join(",")}`);
  idx++;
}

console.log("✅ 拆批完成。");
