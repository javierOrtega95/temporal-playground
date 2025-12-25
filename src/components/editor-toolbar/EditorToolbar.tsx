import { useEffect, useRef, useState } from 'react'
import type { EditorToolbarProps } from './types'

export default function EditorToolbar({
  examples,
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

  const handleExampleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = examples.find((example) => example.id === event.target.value)

    if (!selected) return

    onExampleChange(selected)
  }

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
    }, 1200)
  }

  return (
    <div className='flex items-center gap-3 flex-shrink-0'>
      <div className='flex items-center justify-between bg-surface-light p-2 rounded-lg border border-[#e7ebf3] shadow-sm flex-1'>
        {/* Left: Example selector */}
        <div className='flex items-center flex-1 gap-2'>
          <span className='material-icon text-text-secondary ml-2 text-[20px]'>code_blocks</span>

          <div className='relative flex items-center flex-1'>
            <select
              className='appearance-none bg-transparent border-none pr-8 text-sm font-medium text-text-main focus:outline-none cursor-pointer w-full'
              value={selectedExample}
              aria-label='Select Temporal example'
              onChange={handleExampleChange}
            >
              {examples.map((example) => (
                <option key={example.id} value={example.id}>
                  Example: {example.label}
                </option>
              ))}
            </select>

            <span className='material-icon pointer-events-none absolute right-2 text-[18px] text-text-secondary'>
              expand_more
            </span>
          </div>
        </div>

        {/* Right: actions */}
        <div className='border-l border-gray-200 pl-2 ml-2 flex gap-1'>
          <button
            onClick={onReset}
            title='Reset code'
            className='flex items-center p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded transition-colors'
          >
            <span className='material-icon text-[20px]'>restart_alt</span>
          </button>

          <button
            onClick={handleCopyClick}
            title={copied ? 'Copied!' : 'Copy code'}
            className='flex items-center p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded transition-colors'
          >
            <span className='material-icon text-[20px]'>{copied ? 'check' : 'content_copy'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
