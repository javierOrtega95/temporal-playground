import { ErrorBlock } from './components/ErrorBlock'
import { OutputPanelContent } from './components/OutputPanelContent'
import { OutputPanelHeader } from './components/OutputPanelHeader'
import type { OutputPanelProps } from './types'

export default function OutputPanel({ result, status }: OutputPanelProps) {
  return (
    <div className='flex flex-col flex-1 min-h-0 gap-4'>
      <OutputPanelHeader result={result} status={status} />

      <div className='flex-1 min-h-0 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm'>
        <div className='h-full overflow-y-auto p-4 font-mono text-sm space-y-2'>
          {result?.hasError ? (
            <ErrorBlock message={result.messages[0]} />
          ) : (
            <OutputPanelContent result={result} />
          )}
        </div>
      </div>
    </div>
  )
}
