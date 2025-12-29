import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import temporalTypesPlugin from './src/vite-plugins/temporal-types'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), temporalTypesPlugin()],
})
