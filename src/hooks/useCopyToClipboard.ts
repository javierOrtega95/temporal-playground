import { useCallback, useState } from 'react'

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean>

export default function useCopyToClipboard(): {
  copiedText: CopiedValue
  copyToClipboard: CopyFn
  reset: VoidFunction
} {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copyToClipboard: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) return false

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

  return { copiedText, copyToClipboard, reset: () => setCopiedText(null) }
}
