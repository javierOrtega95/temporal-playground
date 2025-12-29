import Editor from '@monaco-editor/react'
import { EDITOR_OPTIONS } from './editorOptions'
import { setupMonacoFonts, setupTemporalPolyfill } from './setupTemporalMonaco'
import type { EditorPanelProps } from './types'

export default function EditorPanel({ code, fileName, onChange }: EditorPanelProps) {
  return (
    <div className='flex flex-col flex-1 min-h-0 overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200'>
      <header className='flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200'>
        <span className='text-xs font-mono text-text-secondary'>{fileName}</span>

        <span className='text-xs text-blue-600 flex items-center gap-1 font-medium'>
          <span className='w-2 h-2 rounded-full bg-blue-600' />
          TypeScript
        </span>
      </header>

      <Editor
        beforeMount={setupTemporalPolyfill}
        onMount={setupMonacoFonts}
        value={code}
        language='typescript'
        theme='vs-light'
        options={EDITOR_OPTIONS}
        onChange={(value) => onChange(value ?? '')}
      />
    </div>
  )
}
