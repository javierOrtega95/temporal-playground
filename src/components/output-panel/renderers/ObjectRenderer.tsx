import { ObjectPreview } from '../components/ObjectPreview'
import { isPlainObject } from '../utils/typeGuards'
import type { RendererProps } from './types'

export function ObjectRenderer({ value }: RendererProps) {
  if (value === null) return <span>null</span>

  if (isPlainObject(value)) {
    return <ObjectPreview value={value} />
  }

  return <span className='text-purple-600'>{String(value)}</span>
}
