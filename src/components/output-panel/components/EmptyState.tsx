import { Terminal } from 'lucide-react'

export function EmptyState() {
  return (
    <div className='flex items-center gap-2 text-text-secondary dark:text-gray-400'>
      <Terminal size={18} />

      <span className='italic'>Run code to see output</span>
    </div>
  )
}
