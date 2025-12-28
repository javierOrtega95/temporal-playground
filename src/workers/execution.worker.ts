import { Temporal } from '@js-temporal/polyfill'

type Self = Window & typeof globalThis & { Temporal: typeof Temporal }
;(self as Self).Temporal = Temporal

self.onmessage = (event) => {
  const { type, code } = event.data
  if (type !== 'execute') return

  const messages = []
  const start = performance.now()

  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug,
  }

  const capture =
    (level: MessageType) =>
    (...args: unknown[]) => {
      messages.push({
        id: crypto.randomUUID(),
        type: level,
        parts: args.map((arg) => ({
          kind: 'value',
          value: arg,
        })),
      })
    }

  console.log = capture('log')
  console.warn = capture('warn')
  console.error = capture('error')
  console.info = capture('info')
  console.debug = capture('debug')

  let hasError = false

  try {
    const fn = new Function(code)
    const result = fn()

    if (result !== undefined) {
      messages.push({
        id: crypto.randomUUID(),
        type: 'log',
        parts: [{ kind: 'value', value: result }],
      })
    }
  } catch (error) {
    hasError = true
    messages.push({
      id: crypto.randomUUID(),
      type: 'error',
      parts: [
        {
          kind: 'value',
          value:
            error instanceof Error ? { name: error.name, message: error.message } : String(error),
        },
      ],
    })
  } finally {
    console.log = originalConsole.log
    console.warn = originalConsole.warn
    console.error = originalConsole.error
  }

  self.postMessage({
    type: 'result',
    result: {
      durationMs: performance.now() - start,
      hasError,
      messages,
    },
  })
}
