import { defineType, defineField, defineArrayMember } from 'sanity'

export const product = defineType({
  name: 'product',
  title: '产品',
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
      type: 'reference',
      to: [{ type: 'productCategory' }],
    }),
    defineField({
      name: 'heroImage',
      title: '主图',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'galleryImages',
      title: '产品图集',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
    defineField({
      name: 'summary',
      title: '摘要',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: '正文',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'gallery',
      title: '图库',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
    defineField({
      name: 'applications',
      title: 'Application / 使用场景',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'partType',
          title: 'Part Type',
          type: 'string',
          description: 'e.g. Metal fasteners, plastic components…',
        }),
        defineField({
          name: 'feedingBehavior',
          title: 'Feeding Behavior',
          type: 'string',
          description: 'e.g. Continuous orientation…',
        }),
        defineField({
          name: 'application',
          title: 'Application',
          type: 'string',
          description: 'e.g. Assembly line integration…',
        }),
      ],
    }),
    defineField({
      name: 'specs',
      title: '规格参数',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: '标签', type: 'string' }),
            defineField({ name: 'value', title: '值', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'video',
      title: '产品演示视频',
      type: 'reference',
      to: [{ type: 'video' }],
      description: '可选。关联一个视频文档（可本地上传或填 YouTube/Vimeo ID）',
    }),
    defineField({
      name: 'faq',
      title: '常见问题',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'question', title: '问题', type: 'string' }),
            defineField({ name: 'answer', title: '答案', type: 'text' }),
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
