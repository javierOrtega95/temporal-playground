import Editor from '@monaco-editor/react'
import { EDITOR_OPTIONS } from './editorOptions'
import { setupMonacoFonts, setupTemporalLanguage } from './setupTemporalMonaco'
import type { EditorPanelProps } from './types'

export default function EditorPanel({ code, fileName, onChange }: EditorPanelProps) {
  return (
    <div className='flex-1 min-h-0 overflow-hidden'>
      <div className='h-full bg-white rounded-xl overflow-hidden shadow-sm flex flex-col border border-gray-200'>
        {/* Header */}
        <div className='flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200'>
          <span className='text-xs font-mono text-text-secondary'>{fileName}</span>

          <span className='text-xs text-blue-600 flex items-center gap-1 font-medium'>
            <span className='w-2 h-2 rounded-full bg-blue-600' />
            TypeScript
          </span>
        </div>

        <Editor
          beforeMount={setupTemporalLanguage}
          onMount={setupMonacoFonts}
          value={code}
          language='typescript'
          theme='vs-light'
          height='100%'
          options={EDITOR_OPTIONS}
          onChange={(value) => onChange(value ?? '')}
        />
      </div>
    </div>
  )
}
