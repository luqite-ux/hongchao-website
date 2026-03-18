import { defineType, defineField, defineArrayMember } from 'sanity'

export const post = defineType({
  name: 'post',
  title: '文章（Blog Post）',
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
      name: 'coverImage',
      title: '封面图',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: '摘要',
      type: 'text',
      rows: 3,
      description: '用于列表页与 SEO 描述的简短摘要',
    }),
    defineField({
      name: 'publishedAt',
      title: '发布时间',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
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
        defineField({
          name: 'ogImage',
          title: 'OG 图片',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
})

