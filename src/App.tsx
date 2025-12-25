import { useState } from 'react'
import EditorPanel from './components/editor-panel/EditorPanel'
import EditorToolbar from './components/editor-toolbar/EditorToolbar'
import Footer from './components/Footer'
import Header from './components/Header'
import { EXAMPLES } from './examples'

export default function App() {
  const [selectedExample, setSelectedExample] = useState<TemporalExample>(EXAMPLES[0])

  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <Header />

      <main className='flex flex-col flex-1 min-h-0 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0'>
          {/** Left Panel: Input & Editor **/}
          <div className='lg:col-span-7 flex flex-col gap-4 min-h-0'>
            <EditorToolbar
              examples={EXAMPLES}
              selectedExample={selectedExample.id}
              onExampleChange={(example) => setSelectedExample(example)}
              onCopy={() => {}}
              onReset={() => {}}
            />

            <EditorPanel
              code={selectedExample.code}
              fileName={selectedExample.filename}
              onChange={() => {}}
            />
          </div>

          {/** Right Panel: Output **/}
          <div className='lg:col-span-5 flex flex-col gap-4 h-full'>Right Panel</div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
