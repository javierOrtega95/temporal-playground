export interface UseCodeExecutionReturn {
  executionResult: ExecutionResult | null
  executionStatus: ExecutionStatus
}

export interface UseCodeExecutionParams {
  code: string
  debounceMs?: number
  timeoutMs?: number
}
