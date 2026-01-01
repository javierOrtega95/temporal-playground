import type { RendererProps } from './types'

export function NumberRenderer({ value }: RendererProps) {
  return <span className='text-blue-600'>{value as number}</span>
}
