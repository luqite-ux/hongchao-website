import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schemaTypes } from './schemaTypes/index'
import { structure } from './structure'

console.log('[Sanity config] loaded')

export default defineConfig({
  name: 'default',
  title: ' 宏超',

  projectId: 'rbkc9qwm',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((t) => t.schemaType !== 'siteSettings'),
  },
})
