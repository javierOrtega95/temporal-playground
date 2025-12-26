import type { Monaco } from '@monaco-editor/react'
import { temporalTypes } from './temporalTypes'
import type { editor } from 'monaco-editor'

export function setupTemporalLanguage(monaco: Monaco) {
  monaco.languages.typescript.typescriptDefaults.addExtraLib(temporalTypes, 'ts:temporal.d.ts')
}

export function setupMonacoFonts(_editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
  if (!('fonts' in document)) return

  document.fonts.ready.then(() => {
    monaco.editor.remeasureFonts()
  })
}
