import { defineType, defineField, defineArrayMember } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: '首页',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero / Banner' },
    { name: 'categories', title: '分类展示' },
    { name: 'products', title: '精选产品' },
    { name: 'stats', title: '数字统计' },
    { name: 'trust', title: '信任模块（展会/来访/验货）' },
    { name: 'testimonials', title: '客户评价（Testimonials）' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: '文档标题',
      type: 'string',
      description: '仅用于 Studio 内识别，不对外展示',
      initialValue: '首页',
    }),
    // Hero
    defineField({
      name: 'hero',
      title: 'Hero 模块',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', description: '小标题（如 Industrial Automation Systems）' }),
        defineField({ name: 'title', title: '主标题', type: 'string' }),
        defineField({ name: 'subtitle', title: '副标题', type: 'text' }),
        defineField({ name: 'image', title: '背景/配图', type: 'image', options: { hotspot: true } }),
        defineField({
          name: 'ctaPrimary',
          title: '主按钮',
          type: 'object',
          fields: [
            defineField({ name: 'text', title: '文字', type: 'string' }),
            defineField({ name: 'href', title: '链接', type: 'string' }),
          ],
        }),
        defineField({
          name: 'ctaSecondary',
          title: '次要按钮',
          type: 'object',
          fields: [
            defineField({ name: 'text', title: '文字', type: 'string' }),
            defineField({ name: 'href', title: '链接', type: 'string' }),
          ],
        }),
      ],
    }),
    // Featured categories (for Precision Feeding Technology section)
    defineField({
      name: 'featuredCategories',
      title: '精选分类',
      type: 'array',
      group: 'categories',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'productCategory' }] })],
      description: '首页分类卡片展示顺序，为空则按全部分类显示',
    }),
    // Featured products
    defineField({
      name: 'featuredProducts',
      title: '精选产品',
      type: 'array',
      group: 'products',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'product' }] })],
      description: 'Featured Products 展示的产品，为空则按产品列表前几条',
    }),
    // Stats (2005, 16+, etc.)
    defineField({
      name: 'stats',
      title: '数字统计',
      type: 'array',
      group: 'stats',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', title: '数值', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'label', title: '标签', type: 'string', validation: (r) => r.required() }),
          ],
        }),
      ],
    }),
    // Trust section: Exhibition / Client Visit / Customer Inspection
    defineField({
      name: 'trustSection',
      title: '信任模块（展会/来访/验货）',
      type: 'object',
      group: 'trust',
      fields: [
        defineField({
          name: 'exhibitionImages',
          title: 'Exhibition 图片',
          type: 'array',
          of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
          description: '展会现场图片列表（将按顺序展示）。',
        }),
        defineField({
          name: 'clientVisitImages',
          title: 'Client Visit 图片',
          type: 'array',
          of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
          description: '客户来访/工厂参观图片列表。',
        }),
        defineField({
          name: 'inspectionImages',
          title: 'Customer Inspection 图片',
          type: 'array',
          of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
          description: '客户验货/质检现场图片列表（将按顺序展示）。',
        }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: '客户评价列表',
      type: 'array',
      group: 'testimonials',
      description: '首页 “Trusted by Engineers Worldwide” 区块内容，建议 6 条以上用于轮播。',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: '评价内容',
              type: 'text',
              rows: 4,
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'name',
              title: '姓名',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({ name: 'title', title: '职位', type: 'string' }),
            defineField({ name: 'company', title: '公司', type: 'string' }),
            defineField({ name: 'country', title: '国家/地区', type: 'string' }),
            defineField({
              name: 'focus',
              title: '评价维度',
              type: 'string',
              options: {
                list: [
                  { title: 'Service', value: 'Service' },
                  { title: 'Quality', value: 'Quality' },
                  { title: 'Delivery', value: 'Delivery' },
                ],
                layout: 'radio',
              },
              initialValue: 'Service',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'company',
              quote: 'quote',
            },
            prepare({ title, subtitle, quote }: { title?: string; subtitle?: string; quote?: string }) {
              return {
                title: title || 'Unnamed',
                subtitle: subtitle || quote || 'No quote',
              }
            },
          },
        }),
      ],
    }),
  ],
})
