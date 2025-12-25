import Footer from './components/Footer'
import Header from './components/Header'

export default function App() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <Header />

      <main className='flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 h-full'>
          {/** Left Panel: Input & Editor **/}
          <div className='lg:col-span-7 flex flex-col gap-4 h-full'>Lef Panel</div>

          {/** Right Panel: Output **/}
          <div className='lg:col-span-5 flex flex-col gap-4 h-full'>Right Panel</div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
