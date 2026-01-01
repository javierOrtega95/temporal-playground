// src/vite-plugins/temporal-types.ts
import { readFileSync } from 'fs'
import { resolve } from 'path'
import type { Plugin } from 'vite'

export default function temporalTypesPlugin(): Plugin {
  const moduleId = 'temporal-types-raw'
  const resolvedId = '\0' + moduleId

  // Read the Temporal types file at build time
  const typesPath = resolve(process.cwd(), 'node_modules/@js-temporal/polyfill/index.d.ts')
  const content = readFileSync(typesPath, 'utf-8')
  const exportStatement = `export default ${JSON.stringify(content)};`

  console.log('📦 Temporal types loaded at build time')

  return {
    name: 'temporal-types-loader',
    enforce: 'pre',

    resolveId(id: string) {
      if (id === moduleId) {
        return resolvedId
      }
    },

    load(id: string) {
      if (id === resolvedId) {
        return exportStatement
      }
    },
  }
}
