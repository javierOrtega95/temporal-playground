import { useCallback, useEffect, useRef, useState } from 'react'
import type { UseCodeExecutionParams, UseCodeExecutionReturn } from './types'
import { createExecutionWorker } from './helpers'

const EXECUTION_DEBOUNCE_MS = 400
const EXECUTION_TIMEOUT_MS = 10000

export function useCodeExecution({
  code,
  debounceMs = EXECUTION_DEBOUNCE_MS,
  timeoutMs = EXECUTION_TIMEOUT_MS,
}: UseCodeExecutionParams): UseCodeExecutionReturn {
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null)
  const [executionStatus, setExecutionStatus] = useState<ExecutionStatus>('idle')

  const executionTimeoutRef = useRef<number | null>(null)
  const workerRef = useRef<Worker | null>(null)

  const setupWorker = useCallback(() => {
    const worker = createExecutionWorker()

    worker.onmessage = (event) => {
      if (event.data.type !== 'result') return

      if (executionTimeoutRef.current) {
        clearTimeout(executionTimeoutRef.current)
        executionTimeoutRef.current = null
      }

      setExecutionResult(event.data.result)
      setExecutionStatus('idle')
    }

    return worker
  }, [])

  useEffect(() => {
    const worker = setupWorker()
    workerRef.current = worker

    return () => {
      worker.terminate()
    }
  }, [setupWorker])

  useEffect(() => {
    if (!workerRef.current) return

    const debounceId = window.setTimeout(() => {
      if (!workerRef.current) return

      setExecutionStatus('running')

      if (executionTimeoutRef.current) {
        clearTimeout(executionTimeoutRef.current)
        executionTimeoutRef.current = null
      }

      workerRef.current.postMessage({ type: 'execute', code })

      executionTimeoutRef.current = window.setTimeout(() => {
        // worker timeout
        workerRef.current?.terminate()

        const messages: OutputMessage[] = [
          {
            id: crypto.randomUUID(),
            type: 'error',
            parts: [
              {
                kind: 'value',
                value: {
                  name: 'TimeoutError',
                  message: 'Execution took too long and was terminated',
                },
              },
            ],
          },
        ]

        const result: ExecutionResult = {
          hasError: true,
          messages,
        }

        setExecutionResult(result)
        setExecutionStatus('idle')

        // recreate worker
        const newWorker = setupWorker()
        workerRef.current = newWorker
      }, timeoutMs)
    }, debounceMs)

    return () => {
      clearTimeout(debounceId)

      if (executionTimeoutRef.current) {
        clearTimeout(executionTimeoutRef.current)
        executionTimeoutRef.current = null
      }
    }
  }, [code, debounceMs, timeoutMs, setupWorker])

  return { executionResult, executionStatus }
}
