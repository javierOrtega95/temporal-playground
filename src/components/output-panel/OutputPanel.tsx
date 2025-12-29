import OutputPanelContent from './components/OutputPanelContent'
import OutputPanelHeader from './components/OutputPanelHeader'
import type { OutputPanelProps } from './types'

export default function OutputPanel({ result, status }: OutputPanelProps) {
  return (
    <div className='flex flex-col flex-1 min-h-0 gap-4'>
      <OutputPanelHeader result={result} status={status} />

      <div className='flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm'>
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

function ErrorBlock({ message }: { message: OutputMessage }) {
  if (!message) return null

  const error = message.parts[0]?.value as Error

  return (
    <div className='rounded-lg border border-red-200 bg-red-50 p-4 font-mono text-sm'>
      <div className='flex items-center gap-2 text-red-700 font-semibold mb-2'>
        <span className='material-icon'>error</span>
        {error?.name ?? 'Execution Error'}
      </div>

      <div className='text-red-800'>{error?.message ?? String(error)}</div>
    </div>
  )
}
