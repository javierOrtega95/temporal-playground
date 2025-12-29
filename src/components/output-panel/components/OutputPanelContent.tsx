import type { FunctionComponent } from 'react'

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

const VALUE_RENDERERS: Record<string, FunctionComponent<{ value: unknown }>> = {
  string: ({ value }) => <span className='text-emerald-600'>"{value as string}"</span>,
  number: ({ value }) => <span className='text-blue-600'>{value as number}</span>,
  boolean: ({ value }) => <span className='text-orange-600'>{String(value)}</span>,
  undefined: () => <span className='text-gray-400'>undefined</span>,
  object: ({ value }) => {
    if (value === null) return <span>null</span>

    if (isPlainObject(value)) {
      return <ObjectPreview value={value} />
    }

    return <span className='text-purple-600'>{String(value)}</span>
  },
}

const FallbackRenderer: FunctionComponent<{ value: unknown }> = ({ value }) => (
  <span className='text-text-main'>{String(value)}</span>
)

interface OutputPanelProps {
  result: ExecutionResult | null
}

export default function OutputPanelContent({ result }: OutputPanelProps) {
  if (!result || result.messages.length === 0) {
    return <div className='text-text-secondary italic'>No output yet</div>
  }

  return (
    <>
      {result.messages.map((msg) => (
        <div key={msg.id} className='flex items-start gap-2'>
          <span className='select-none text-blue-600'>›</span>

          <div className='flex flex-wrap gap-1 flex-1'>
            {msg.parts.map((part, index) => (
              <OutputMessagePart key={index} part={part} />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

function OutputMessagePart({ part: { kind, value } }: { part: OutputValue }) {
  if (kind === 'label') {
    return <span className='text-gray-600 mr-1'>{value}</span>
  }

  const valueType = typeof value

  const ValuePart = VALUE_RENDERERS[valueType] ?? FallbackRenderer

  if (isPlainObject(value)) {
    return (
      <div className='w-full pl-2'>
        <ObjectPreview value={value} />
      </div>
    )
  }

  return <ValuePart value={value} />
}

function ObjectPreview({ value }: { value: Record<string, unknown> }) {
  const entries = Object.entries(value)

  return (
    <div className='rounded px-2 py-1 text-xs font-mono'>
      {'{'}

      <div className='pl-3 space-y-1'>
        {entries.map(([key, value]) => {
          const ValuePart = VALUE_RENDERERS[typeof value] ?? FallbackRenderer

          return (
            <div key={key}>
              <span className='text-gray-600'>{key}</span>

              {': '}

              <ValuePart value={value} />
            </div>
          )
        })}
      </div>

      {'}'}
    </div>
  )
}
