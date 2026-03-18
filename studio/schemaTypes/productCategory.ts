import { defineType, defineField } from 'sanity'

export const productCategory = defineType({
  name: 'productCategory',
  title: '产品分类',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title_de',
      title: '标题（德语）',
      type: 'string',
    }),
    defineField({
      name: 'title_es',
      title: '标题（西语）',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: '描述',
      type: 'text',
    }),
    defineField({
      name: 'description_de',
      title: '描述（德语）',
      type: 'text',
    }),
    defineField({
      name: 'description_es',
      title: '描述（西语）',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: '分类图片',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
