import { useCallback, useState } from 'react'

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean>

export function useCopyToClipboard(): {
  copiedText: CopiedValue
  copyToClipboard: CopyFn
  reset: () => void
} {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copyToClipboard: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }, [])

  const reset = () => {
    setCopiedText(null)
  }

  return { copiedText, copyToClipboard, reset }
}
