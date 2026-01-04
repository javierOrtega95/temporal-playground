import { ObjectPreview } from '../components/ObjectPreview'
import { isPlainObject } from '../utils/typeGuards'
import type { RendererProps } from './types'

export function ObjectRenderer({ value }: RendererProps) {
  if (value === null) return <span className='text-gray-500 dark:text-gray-400'>null</span>

  if (isPlainObject(value)) {
    return <ObjectPreview value={value} />
  }

  return <span className='text-purple-600 dark:text-purple-400'>{String(value)}</span>
}
