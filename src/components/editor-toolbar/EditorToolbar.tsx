import { useEffect, useRef, useState } from 'react'
import ExampleSelector from '../example-selector/ExampleSelector'
import type { EditorToolbarProps } from './types'

const COPY_FEEDBACK_DURATION = 1200

export default function EditorToolbar({
  selectedExample,
  onExampleChange,
  onReset,
  onCopy,
}: EditorToolbarProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleCopyClick = async () => {
    const success = await onCopy()
    if (!success) return

    setCopied(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopied(false)
      timeoutRef.current = null
    }, COPY_FEEDBACK_DURATION)
  }

  return (
    <div className='flex items-center gap-3 flex-shrink-0'>
      <div className='flex flex-col gap-1 bg-surface-light dark:bg-gray-800 p-2 rounded-lg border border-[#e7ebf3] dark:border-gray-700 shadow-sm flex-1'>
        <div className='flex items-center justify-between'>
          <ExampleSelector selectedExample={selectedExample} onExampleChange={onExampleChange} />

          <div className='border-l border-gray-200 dark:border-gray-600 pl-2 ml-2 flex gap-1'>
            <button
              onClick={onReset}
              title='Reset code'
              className='flex items-center p-2 text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 hover:bg-primary/5 dark:hover:bg-blue-500/10 rounded transition-colors'
            >
              <span className='material-icon text-[20px]'>restart_alt</span>
            </button>

            <button
              onClick={handleCopyClick}
              title={copied ? 'Copied!' : 'Copy code'}
              className='flex items-center p-2 text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 hover:bg-primary/5 dark:hover:bg-blue-500/10 rounded transition-colors'
            >
              <span className='material-icon text-[20px]'>{copied ? 'check' : 'content_copy'}</span>
            </button>
          </div>
        </div>

        {selectedExample.description && (
          <div className='mt-1 bg-primary/5 dark:bg-blue-500/10 rounded px-2 py-1.5 border-l-2 border-primary/30 dark:border-blue-400/30'>
            <p className='text-xs text-text-secondary dark:text-gray-400 leading-relaxed'>
              {selectedExample.description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
