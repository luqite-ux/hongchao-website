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
      name: 'logoSmall',
      title: '小 Logo（页脚/移动端用）',
      type: 'image',
      options: { hotspot: true },
      description: '建议上传方形小尺寸 Logo，用于页脚或空间受限位置',
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
      name: 'social',
      title: '社交媒体链接',
      type: 'object',
      fields: [
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'twitter', title: 'X / Twitter', type: 'url' }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: '默认 SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: '标题', type: 'string' }),
        defineField({ name: 'description', title: '描述', type: 'text' }),
        defineField({ name: 'title_de', title: '标题（德语）', type: 'string' }),
        defineField({ name: 'description_de', title: '描述（德语）', type: 'text' }),
        defineField({ name: 'title_es', title: '标题（西语）', type: 'string' }),
        defineField({ name: 'description_es', title: '描述（西语）', type: 'text' }),
        defineField({ name: 'ogImage', title: 'OG 图片', type: 'image', options: { hotspot: true } }),
      ],
    }),
  ],
})
