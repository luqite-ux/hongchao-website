import { defineType, defineField } from 'sanity'

export const video = defineType({
  name: 'video',
  title: '视频',
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
      name: 'source',
      title: '来源',
      type: 'string',
      options: {
        list: [
          { title: '本地上传', value: 'upload' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'URL', value: 'url' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoFile',
      title: '视频文件',
      type: 'file',
      description: '直接上传 MP4、WebM 等视频文件',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.source !== 'upload',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { source?: string } | undefined
          if (parent?.source === 'upload' && !value?.asset) {
            return '请上传视频文件'
          }
          return true
        }),
    }),
    defineField({
      name: 'videoId',
      title: '视频 ID',
      type: 'string',
      description: 'YouTube 或 Vimeo 的视频 ID',
      hidden: ({ parent }) => parent?.source === 'url' || parent?.source === 'upload',
    }),
    defineField({
      name: 'url',
      title: '视频 URL',
      type: 'url',
      hidden: ({ parent }) => parent?.source !== 'url',
    }),
    defineField({
      name: 'coverImage',
      title: '封面图',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: '描述',
      type: 'text',
    }),
  ],
})
