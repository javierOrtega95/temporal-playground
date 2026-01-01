import { useEffect, useRef, useState } from 'react'
import { EXAMPLES_GROUPED } from '../../examples'
import type { ExampleSelectorProps } from './types'

export default function ExampleSelector({
  selectedExample,
  onExampleChange,
}: ExampleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className='relative flex-1'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors'
      >
        <span className='material-icon text-text-secondary text-[18px]'>code</span>
        <span className='text-sm font-medium flex-1 text-left'>{selectedExample.label}</span>
        <span className='material-icon text-text-secondary text-[18px]'>
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto'>
          {Object.entries(EXAMPLES_GROUPED).map(([key, group]) => (
            <div key={key} className='py-2'>
              <div className='px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide'>
                {group.label}
              </div>
              {group.examples.map((example) => (
                <button
                  key={example.id}
                  onClick={() => {
                    onExampleChange(example)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-primary/5 transition-colors ${
                    selectedExample.id === example.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : ''
                  }`}
                >
                  <div className='text-sm'>{example.label}</div>
                  {example.description && (
                    <div className='text-xs text-gray-500 mt-0.5'>{example.description}</div>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
