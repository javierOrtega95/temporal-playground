import type { RendererProps } from './types'

export function StringRenderer({ value }: RendererProps) {
  return <span className='text-emerald-600'>"{value as string}"</span>
}
