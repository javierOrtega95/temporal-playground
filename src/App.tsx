import { useEffect, useRef, useState } from 'react'
import EditorPanel from './components/editor-panel/EditorPanel'
import EditorToolbar from './components/editor-toolbar/EditorToolbar'
import Footer from './components/Footer'
import Header from './components/Header'
import OutputPanel from './components/output-panel/OutputPanel'
import { EXAMPLES } from './examples'
import useCopyToClipboard from './hooks/useCopyToClipboard'

const EXECUTION_DEBOUNCE_MS = 400
const EXECUTION_TIMEOUT_MS = 10000

export default function App() {
  const [initialExample] = EXAMPLES

  const [selectedExample, setSelectedExample] = useState<TemporalExample>(initialExample)
  const [code, setCode] = useState<string>(initialExample.code)

  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null)
  const [executionStatus, setExecutionStatus] = useState<ExecutionStatus>('idle')

  const executionTimeoutRef = useRef<number | null>(null)
  const workerRef = useRef<Worker | null>(null)

  const { copyToClipboard } = useCopyToClipboard()

  function createWorker() {
    const WorkerURL = new URL('./workers/execution.worker.ts', import.meta.url)
    const worker = new Worker(WorkerURL, { type: 'module' })

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
  }

  useEffect(() => {
    const worker = createWorker()
    workerRef.current = worker

    return () => {
      worker.terminate()
    }
  }, [])

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
        const newWorker = createWorker()
        workerRef.current = newWorker
      }, EXECUTION_TIMEOUT_MS)
    }, EXECUTION_DEBOUNCE_MS)

    return () => {
      clearTimeout(debounceId)

      if (executionTimeoutRef.current) {
        clearTimeout(executionTimeoutRef.current)
        executionTimeoutRef.current = null
      }
    }
  }, [code])

  const handleExampleChange = (example: TemporalExample) => {
    setSelectedExample(example)
    setCode(example.code)
  }

  return (
    <div className='flex flex-col h-screen bg-gray-50'>
      <Header />

      <main className='flex flex-col flex-1 min-h-0 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0'>
          <section className='lg:col-span-7 flex flex-col gap-4 min-h-0'>
            <EditorToolbar
              examples={EXAMPLES}
              selectedExample={selectedExample}
              onExampleChange={handleExampleChange}
              onReset={() => setCode(selectedExample.code)}
              onCopy={() => copyToClipboard(code)}
            />

            <EditorPanel
              code={code}
              fileName={selectedExample.filename}
              onChange={(code) => setCode(code)}
            />
          </section>

          <section className='lg:col-span-5 flex flex-col min-h-0'>
            <OutputPanel result={executionResult} status={executionStatus} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
