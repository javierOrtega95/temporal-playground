import { Temporal } from '@js-temporal/polyfill'
import { generateId } from '../utils/uuid'

type Self = Window & typeof globalThis & { Temporal: typeof Temporal }
;(self as Self).Temporal = Temporal

self.onmessage = (event) => {
  const { type, code } = event.data
  if (type !== 'execute') return

  const messages: OutputMessage[] = []
  const start = performance.now()

  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug,
  }

  const capture = (level: MessageType) => {
    return (...args: unknown[]) => {
      messages.push({
        id: generateId(),
        type: level,
        parts: args.map((arg) => ({ kind: 'value', value: arg })),
      })
    }
  }

  console.log = capture('log')
  console.warn = capture('warn')
  console.error = capture('error')
  console.info = capture('info')
  console.debug = capture('debug')

  let fn

  try {
    // Check for syntax errors
    fn = new Function(code)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorValue: unknown | string = { name: 'Syntax Error', message: errorMessage }

    const messages: OutputMessage[] = [
      {
        id: generateId(),
        type: 'error',
        parts: [
          {
            kind: 'value',
            value: errorValue,
          },
        ],
      },
    ]

    const response: WorkerResponse = {
      type: 'result',
      result: {
        hasError: true,
        messages,
      },
    }

    self.postMessage(response)

    return
  }

  let hasError = false

  try {
    // Execute the code
    const result = fn()

    if (result !== undefined) {
      const message: OutputMessage = {
        id: generateId(),
        type: 'log',
        parts: [{ kind: 'value', value: result }],
      }

      messages.push(message)
    }
  } catch (error) {
    hasError = true

    const errorValue: unknown | string =
      error instanceof Error ? { name: error.name, message: error.message } : String(error)

    const message: OutputMessage = {
      id: generateId(),
      type: 'error',
      parts: [
        {
          kind: 'value',
          value: errorValue,
        },
      ],
    }

    messages.push(message)
  } finally {
    Object.assign(console, originalConsole)
  }

  const result: ExecutionResult = {
    durationMs: performance.now() - start,
    hasError,
    messages,
  }

  const response: WorkerResponse = { type: 'result', result }

  self.postMessage(response)
}
