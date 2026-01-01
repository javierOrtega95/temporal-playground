interface ErrorBlockProps {
  message: OutputMessage
}

export function ErrorBlock({ message }: ErrorBlockProps) {
  if (!message) return null

  const error = message.parts[0]?.value as Error

  return (
    <div className='rounded-lg border border-red-200 bg-red-50 p-4 font-mono text-sm'>
      <div className='flex items-center gap-2 text-red-700 font-semibold mb-2'>
        <span className='material-icon'>error</span>
        {error?.name ?? 'Execution Error'}
      </div>

      <div className='text-red-800'>{error?.message ?? String(error)}</div>
    </div>
  )
}
