import type { ReactNode } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: VoidFunction
}

export interface ThemeProviderProps {
  children: ReactNode
}
