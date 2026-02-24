import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const ThemeIcon = theme === 'light' ? Moon : Sun

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
      aria-label='Toggle theme'
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <ThemeIcon size={20} className='text-gray-700 dark:text-gray-300' />
    </button>
  )
}
