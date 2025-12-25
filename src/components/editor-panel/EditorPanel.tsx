import Editor from '@monaco-editor/react'
import type { EditorPanelProps } from './types'
import { temporalTypes } from './temporalTypes'

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

        {/* Monaco */}
        <div className='flex-1 min-h-0'>
          <Editor
            beforeMount={(monaco) => {
              monaco.languages.typescript.typescriptDefaults.addExtraLib(
                temporalTypes,
                'ts:temporal.d.ts'
              )
            }}
            value={code}
            language='typescript'
            theme='vs-light'
            height='100%'
            onChange={(value) => onChange(value ?? '')}
            options={{
              fontSize: 14,
              fontFamily: 'JetBrains Mono',
              lineHeight: 22,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              scrollbar: {
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
