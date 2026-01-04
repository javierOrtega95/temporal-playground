import type { RendererProps } from './types'

export function BooleanRenderer({ value }: RendererProps) {
  return <span className='text-orange-600 dark:text-orange-400'>{String(value)}</span>
}
