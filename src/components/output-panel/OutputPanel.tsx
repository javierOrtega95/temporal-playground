import OutputPanelContent from './components/OutputPanelContent'
import OutputPanelHeader from './components/OutputPanelHeader'
import type { OutputPanelProps } from './types'

export default function OutputPanel({ result }: OutputPanelProps) {
  return (
    <>
      <OutputPanelHeader result={result} />

      <div className='flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col'>
        <div className='flex-1 p-4 overflow-y-auto custom-scrollbar font-mono text-sm space-y-2'>
          <OutputPanelContent result={result} />
        </div>
      </div>
    </>
  )
}
