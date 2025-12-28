import OutputPanelContent from './components/OutputPanelContent'
import OutputPanelHeader from './components/OutputPanelHeader'
import type { OutputPanelProps } from './types'

export default function OutputPanel({ result }: OutputPanelProps) {
  return (
    <div className='flex flex-col flex-1 min-h-0 gap-4'>
      <OutputPanelHeader result={result} />

      <div className='flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm'>
        <div className='h-full overflow-y-auto p-4 font-mono text-sm space-y-2'>
          <OutputPanelContent result={result} />
        </div>
      </div>
    </div>
  )
}
