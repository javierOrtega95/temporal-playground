import type { RendererProps } from './types'

export function StringRenderer({ value }: RendererProps) {
  return <span className='text-emerald-600 dark:text-emerald-400'>"{value as string}"</span>
}
