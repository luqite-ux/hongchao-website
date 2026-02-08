import { defineType, defineField } from 'sanity'

export const patent = defineType({
  name: 'patent',
  title: '专利',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '专利标题',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'patentNo',
      title: '专利号',
      type: 'string',
      description: '例如 CN-XXXXXX-A',
    }),
    defineField({
      name: 'category',
      title: '类型',
      type: 'string',
      options: {
        list: [
          { title: 'Invention', value: 'Invention' },
          { title: 'Utility Model', value: 'Utility Model' },
        ],
        layout: 'dropdown',
      },
      description: '发明或实用新型',
    }),
    defineField({
      name: 'summary',
      title: '摘要',
      type: 'text',
      description: '可选，用于扩展展示',
    }),
    defineField({
      name: 'order',
      title: '排序',
      type: 'number',
      description: '数字越小越靠前，相同则按创建时间倒序',
    }),
    defineField({
      name: 'isFeatured',
      title: '精选',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    { title: '排序升序', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }, { field: '_createdAt', direction: 'desc' }] },
    { title: '排序降序', name: 'orderDesc', by: [{ field: 'order', direction: 'desc' }, { field: '_createdAt', direction: 'desc' }] },
  ],
})
