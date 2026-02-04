import type { StructureResolver } from 'sanity/structure'

const SINGLETONS = ['siteSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('内容')
    .items([
      // 站点设置（单例，固定 documentId）
      S.listItem()
        .title('站点设置')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('站点设置')
        ),
      S.divider(),
      // 其他文档类型（产品分类 / 产品 / 案例 / 视频 / 询盘）
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.includes(listItem.getId() as string)
      ),
    ])
