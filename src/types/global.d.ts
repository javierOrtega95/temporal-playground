// ============================================
// Vite Modules
// ============================================

declare module 'temporal-types-raw' {
  const content: string
  export default content
}

// ============================================
// Examples Domain
// ============================================

type TemporalExampleID = string

type TemporalExample = {
  id: TemporalExampleID
  label: string
  filename: string
  description?: string
  code: string
}

// ============================================
// Code Execution Domain
// ============================================

type ExecutionStatus = 'idle' | 'running'

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

type WorkerResponse = { type: 'result'; result: ExecutionResult }
