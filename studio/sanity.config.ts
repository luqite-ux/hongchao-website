import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

console.log("[Sanity config] loaded");

export default defineConfig({
  name: "default",
  title: "Hongchao Studio",

  projectId:
    process.env.SANITY_STUDIO_PROJECT_ID ??
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
    "",
  dataset:
    process.env.SANITY_STUDIO_DATASET ??
    process.env.NEXT_PUBLIC_SANITY_DATASET ??
    "production",

  // 建议明确 apiVersion（避免默认值变化带来奇怪问题）
  apiVersion: "2024-01-01",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .id("root")
          .title("内容")
          .items([
            S.listItem()
              .id("homepage")
              .title("首页")
              .child(
                S.document()
                  .id("homepageEditor")
                  .schemaType("homepage")
                  .documentId("homepage")
              ),
            S.divider(),
            S.listItem()
              .id("patents")
              .title("专利（Patent）")
              .child(
                S.documentTypeList("patent")
                  .title("专利列表")
                  .defaultOrdering([
                    { field: "order", direction: "asc" },
                    { field: "_createdAt", direction: "desc" },
                  ])
              ),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "homepage" && item.getId() !== "patent"
            ),
          ]),
    }),
    visionTool({
      // 可选：默认写成你现在用的 dataset
      defaultDataset: "production",
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
