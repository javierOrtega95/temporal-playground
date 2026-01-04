import Editor from '@monaco-editor/react'
import { useTheme } from '../../hooks/useTheme'
import { EDITOR_OPTIONS } from './editorOptions'
import { setupMonacoFonts, setupTemporalPolyfill } from './setupTemporalMonaco'
import type { EditorPanelProps } from './types'

export default function EditorPanel({ code, fileName, onChange }: EditorPanelProps) {
  const { theme } = useTheme()

  return (
    <div className='flex flex-col flex-1 min-h-0 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700'>
      <header className='flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'>
        <span className='text-xs font-mono text-text-secondary dark:text-gray-400'>{fileName}</span>

        <span className='text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 font-medium'>
          <span className='w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400' />
          TypeScript
        </span>
      </header>

      <Editor
        beforeMount={setupTemporalPolyfill}
        onMount={setupMonacoFonts}
        value={code}
        language='typescript'
        theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
        loading={
          <div className='flex items-center justify-center w-full h-full bg-white dark:bg-[#1e1e1e] text-gray-600 dark:text-gray-400'>
            <span className='text-sm'>Loading editor...</span>
          </div>
        }
        options={EDITOR_OPTIONS}
        onChange={(value) => onChange(value ?? '')}
      />
    </div>
  )
}
