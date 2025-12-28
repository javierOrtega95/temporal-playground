export type OutputValue = { kind: 'label'; value: string } | { kind: 'value'; value: unknown }

type OutputMessage = {
  id: string
  type: 'log' | 'warn' | 'error'
  parts: OutputValue[]
}

export type ExecutionResult = {
  durationMs?: number
  messages: OutputMessage[]
  hasError?: boolean
}

export interface OutputPanelProps {
  result: ExecutionResult | null
}
