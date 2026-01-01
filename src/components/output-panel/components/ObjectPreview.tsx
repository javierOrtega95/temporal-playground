import { VALUE_RENDERERS, FallbackRenderer } from '../renderers'

interface ObjectPreviewProps {
  value: Record<string, unknown>
}

export function ObjectPreview({ value }: ObjectPreviewProps) {
  const entries = Object.entries(value)

  return (
    <div className='rounded px-2 py-1 text-xs font-mono'>
      {'{'}

      <div className='pl-3 space-y-1'>
        {entries.map(([key, val]) => {
          const ValuePart = VALUE_RENDERERS[typeof val] ?? FallbackRenderer

          return (
            <div key={key}>
              <span className='text-gray-600'>{key}</span>
              {': '}
              <ValuePart value={val} />
            </div>
          )
        })}
      </div>

      {'}'}
    </div>
  )
}
