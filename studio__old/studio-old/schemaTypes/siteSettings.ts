import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: '站点设置',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: '公司名称',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contact',
      title: '联系方式',
      type: 'object',
      fields: [
        defineField({ name: 'phone', title: '电话', type: 'string' }),
        defineField({ name: 'email', title: '邮箱', type: 'string' }),
        defineField({ name: 'address', title: '地址', type: 'string' }),
        defineField({ name: 'wechat', title: '微信', type: 'string' }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: '默认 SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: '标题', type: 'string' }),
        defineField({ name: 'description', title: '描述', type: 'text' }),
        defineField({ name: 'ogImage', title: 'OG 图片', type: 'image', options: { hotspot: true } }),
      ],
    }),
  ],
})
