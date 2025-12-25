import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const $root = document.getElementById('root') as HTMLElement
const root = createRoot($root)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
