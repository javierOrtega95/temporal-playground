import { EmptyState } from './EmptyState'
import { OutputMessage } from './OutputMessage'

interface OutputPanelContentProps {
  result: ExecutionResult | null
}

export function OutputPanelContent({ result }: OutputPanelContentProps) {
  if (!result || result.messages.length === 0) {
    return <EmptyState />
  }

  return (
    <ul className='space-y-2'>
      {result.messages.map((message) => (
        <OutputMessage key={message.id} message={message} />
      ))}
    </ul>
  )
}
