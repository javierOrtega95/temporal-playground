import type { Monaco } from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import temporalDts from 'temporal-types-raw'

export function setupTemporalPolyfill(monaco: Monaco) {
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  })

  // Add the Temporal types from the polyfill
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    temporalDts,
    'file:///node_modules/@js-temporal/polyfill/index.d.ts'
  )

  // Declare Temporal as a global variable
  const globalDeclaration = `
  import { Temporal } from '@js-temporal/polyfill';

  declare global {
    const Temporal: typeof import('@js-temporal/polyfill').Temporal;
  }

  export {};`

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    globalDeclaration,
    'file:///temporal-global.d.ts'
  )

  console.log('✅ Temporal types loaded successfully')
}

export function setupMonacoFonts(_editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
  if (!('fonts' in document)) return

  document.fonts.ready.then(() => {
    monaco.editor.remeasureFonts()
  })
}
