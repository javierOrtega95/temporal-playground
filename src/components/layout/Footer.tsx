export default function Footer() {
  return (
    <footer className='bg-white dark:bg-gray-900 border-t border-[#e7ebf3] dark:border-gray-700 py-6 flex-shrink-0'>
      <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4'>
        <p className='text-xs text-text-secondary dark:text-gray-400'>
          Built for the TC39 Temporal Proposal. Released under MIT License.
        </p>

        <div className='flex items-center gap-6'>
          <div className='flex gap-4 text-sm font-medium text-text-secondary dark:text-gray-400'>
            <a
              className='hover:text-primary dark:hover:text-blue-400 transition-colors'
              href='https://github.com/tc39/proposal-temporal'
              target='_blank'
            >
              TC39 Proposal
            </a>

            <a
              className='hover:text-primary dark:hover:text-blue-400 transition-colors'
              href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal'
              target='_blank'
            >
              MDN Docs
            </a>

            <a
              className='hover:text-primary dark:hover:text-blue-400 transition-colors'
              href='https://github.com/js-temporal/temporal-polyfill'
              target='_blank'
            >
              Polyfill
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
