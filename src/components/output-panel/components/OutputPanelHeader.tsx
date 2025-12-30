import { useState, useRef, useEffect } from 'react'
import useCopyToClipboard from '../../../hooks/useCopyToClipboard'
import type { OutputPanelProps } from '../types'

export default function OutputPanelHeader({ result, status }: OutputPanelProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const { copyToClipboard } = useCopyToClipboard()

  const hasOutput = result && result.messages.length > 0

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleCopy = async () => {
    if (!result || result.messages.length === 0) return

    const outputText = result.messages
      .map((msg) =>
        msg.parts
          .map((part) => {
            if (part.kind === 'label') return part.value

            if (typeof part.value === 'object' && part.value !== null) {
              return JSON.stringify(part.value, null, 2)
            }

            return String(part.value)
          })
          .join(' ')
      )
      .join('\n')

    const success = await copyToClipboard(outputText)
    if (!success) return

    setCopied(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopied(false)
      timeoutRef.current = null
    }, 1200)
  }
  return (
    <header className='flex items-center justify-between pb-2 border-b border-gray-200 flex-shrink-0'>
      <div className='flex items-center gap-2'>
        <h2 className='text-lg font-bold text-text-main flex items-center gap-2'>
          {status === 'running' ? (
            <>
              <span className='animate-spin material-icon text-blue-600'>autorenew</span>
              Running…
            </>
          ) : (
            <>
              <span
                className={`material-icon ${result?.hasError ? 'text-red-600' : 'text-green-600'}`}
              >
                {result?.hasError ? 'cancel' : 'check_circle'}
              </span>

              {result?.hasError ? 'Execution error' : 'Execution output'}
            </>
          )}
        </h2>

        <button
          onClick={handleCopy}
          disabled={!hasOutput || status === 'running'}
          title={copied ? 'Copied!' : 'Copy output'}
          className='flex items-center p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-text-secondary'
        >
          <span className='material-icon text-[20px]'>{copied ? 'check' : 'content_copy'}</span>
        </button>
      </div>

      {status !== 'running' && result?.durationMs != null && (
        <span className='text-xs font-mono text-text-secondary bg-gray-100 px-2 py-1 rounded'>
          {result.durationMs.toFixed(1)} ms
        </span>
      )}
    </header>
  )
}
