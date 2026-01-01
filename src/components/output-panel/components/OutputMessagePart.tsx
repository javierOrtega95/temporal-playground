import { VALUE_RENDERERS, FallbackRenderer } from '../renderers'
import { isPlainObject } from '../utils/typeGuards'
import { ObjectPreview } from './ObjectPreview'

interface OutputMessagePartProps {
  part: OutputValue
}

export function OutputMessagePart({ part }: OutputMessagePartProps) {
  const { kind, value } = part

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
