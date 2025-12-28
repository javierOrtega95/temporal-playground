type TemporalExampleID = string

type TemporalExample = {
  id: TemporalExampleID
  label: string
  filename: string
  description: string
  code: string
}

type ExecutionResult = {
  durationMs?: number
  messages: OutputMessage[]
  hasError?: boolean
}

type OutputMessage = {
  id: string
  type: MessageType
  parts: OutputValue[]
}

type MessageType = 'log' | 'warn' | 'error' | 'info' | 'debug'

type OutputValue = { kind: 'label'; value: string } | { kind: 'value'; value: unknown }
