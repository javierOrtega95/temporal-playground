import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#135bec',
        'primary-dark': '#0e46b9',
        'background-light': '#f8f9fc',
        'background-dark': '#101622',
        'surface-light': '#ffffff',
        'text-main': '#0d121b',
        'text-secondary': '#4c669a',
        'code-bg': '#1e293b',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} satisfies Config
