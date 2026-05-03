import { documentInternationalization } from '@sanity/document-internationalization'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId, supportedLocales } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schemas'
import { structure } from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Alba Ventanas',
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    documentInternationalization({
      supportedLanguages: supportedLocales.map((l) => ({ id: l.id, title: l.title })),
      schemaTypes: ['post'],
    }),
  ],
})
