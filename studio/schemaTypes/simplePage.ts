import { defineArrayMember, defineField, defineType } from "sanity"

export const simplePage = defineType({
  name: "simplePage",
  title: "通用页面（Simple Page）",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "标题",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "section",
      title: "页面分组",
      type: "string",
      options: {
        list: [
          { title: "Company", value: "company" },
          { title: "Support", value: "support" },
          { title: "Legal", value: "legal" },
        ],
      },
      initialValue: "legal",
    }),
    defineField({
      name: "summary",
      title: "摘要",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "updatedAt",
      title: "更新时间",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "content",
      title: "正文",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "SEO 标题", type: "string" }),
        defineField({ name: "description", title: "SEO 描述", type: "text" }),
        defineField({ name: "ogImage", title: "OG 图片", type: "image", options: { hotspot: true } }),
      ],
    }),
  ],
})

