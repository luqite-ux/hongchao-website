import { defineType, defineField } from 'sanity'

export const inquiry = defineType({
  name: 'inquiry',
  title: '询盘',
  type: 'document',
  fields: [
    defineField({
      name: 'createdAt',
      title: '创建时间',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'name',
      title: '姓名',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: '邮箱',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: '电话',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: '公司',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: '留言',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sourcePage',
      title: '来源页面',
      type: 'url',
    }),
    defineField({
      name: 'status',
      title: '状态',
      type: 'string',
      options: {
        list: [
          { title: '新询盘', value: 'new' },
          { title: '已联系', value: 'contacted' },
          { title: '已转化', value: 'qualified' },
          { title: '已关闭', value: 'closed' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
  ],
})
