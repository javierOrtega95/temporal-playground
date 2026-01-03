import { useState } from 'react'
import EditorPanel from './components/editor-panel/EditorPanel'
import EditorToolbar from './components/editor-toolbar/EditorToolbar'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import OutputPanel from './components/output-panel/OutputPanel'
import { EXAMPLES } from './examples'
import { useCodeExecution } from './hooks/use-code-execution/useCodeExecution'
import { useCopyToClipboard } from './hooks/useCopyToClipboard'

export default function App() {
  const [initialExample] = EXAMPLES

  const [selectedExample, setSelectedExample] = useState<TemporalExample>(initialExample)
  const [code, setCode] = useState<string>(initialExample.code)

  const { executionResult, executionStatus } = useCodeExecution({ code })

  const { copyToClipboard } = useCopyToClipboard()

  const handleExampleChange = (example: TemporalExample) => {
    setSelectedExample(example)
    setCode(example.code)
  }

  return (
    <div className='flex flex-col min-h-screen lg:h-screen bg-gray-50 dark:bg-gray-900'>
      <Header />

      <main className='flex flex-col flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:min-h-0'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:flex-1 lg:min-h-0'>
          <section className='lg:col-span-7 flex flex-col gap-4 min-h-[50vh] lg:min-h-0'>
            <EditorToolbar
              selectedExample={selectedExample}
              onExampleChange={handleExampleChange}
              onReset={() => setCode(selectedExample.code)}
              onCopy={() => copyToClipboard(code)}
            />

            <EditorPanel code={code} fileName={selectedExample.filename} onChange={setCode} />
          </section>

          <section className='lg:col-span-5 flex flex-col min-h-[50vh] lg:min-h-0'>
            <OutputPanel result={executionResult} status={executionStatus} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
