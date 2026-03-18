import { defineType, defineField, defineArrayMember } from 'sanity'

export const faqPage = defineType({
  name: 'faqPage',
  title: '常见问题（FAQ）',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '页面标题',
      type: 'string',
      initialValue: 'FAQs',
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
      name: 'items',
      title: '问题列表',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: '问题',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: '答案',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
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

