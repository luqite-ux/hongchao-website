import { defineType, defineField, defineArrayMember } from 'sanity'

export const docPage = defineType({
  name: 'docPage',
  title: '资源（Doc Page）',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: '分类',
      type: 'string',
      options: {
        list: [
          { title: 'Guide', value: 'guide' },
          { title: 'Technical Article', value: 'article' },
          { title: 'White Paper', value: 'whitepaper' },
          { title: 'Download', value: 'download' },
        ],
      },
      initialValue: 'article',
    }),
    defineField({
      name: 'summary',
      title: '摘要',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'updatedAt',
      title: '更新时间',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'file',
      title: '附件（可选）',
      type: 'file',
      description: '如 PDF 资料、产品手册等。若填写，前端可展示下载入口。',
      options: { storeOriginalFilename: true },
    }),
    defineField({
      name: 'content',
      title: '正文',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'SEO 标题', type: 'string' }),
        defineField({ name: 'description', title: 'SEO 描述', type: 'text' }),
        defineField({ name: 'ogImage', title: 'OG 图片', type: 'image', options: { hotspot: true } }),
      ],
    }),
  ],
})

