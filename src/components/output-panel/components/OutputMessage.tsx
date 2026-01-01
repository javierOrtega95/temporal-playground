import { OutputMessagePart } from './OutputMessagePart'

interface OutputMessageProps {
  message: OutputMessage
}

export function OutputMessage({ message }: OutputMessageProps) {
  return (
    <li className='flex items-start gap-2'>
      <span className='select-none text-blue-600'>›</span>

      <div className='flex flex-wrap gap-1 flex-1'>
        {message.parts.map((part, index) => (
          <OutputMessagePart key={index} part={part} />
        ))}
      </div>
    </li>
  )
}
