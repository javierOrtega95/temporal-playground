import type { OutputPanelProps } from '../types'

export default function OutputPanelHeader({ result, status }: OutputPanelProps) {
  return (
    <header className='flex items-center justify-between pb-2 border-b border-gray-200 flex-shrink-0'>
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

      {status !== 'running' && result?.durationMs != null && (
        <span className='text-xs font-mono text-text-secondary bg-gray-100 px-2 py-1 rounded'>
          {result.durationMs.toFixed(1)} ms
        </span>
      )}
    </header>
  )
}
