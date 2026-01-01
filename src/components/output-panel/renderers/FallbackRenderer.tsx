import type { RendererProps } from './types'

export function FallbackRenderer({ value }: RendererProps) {
  return <span className='text-text-main'>{String(value)}</span>
}
