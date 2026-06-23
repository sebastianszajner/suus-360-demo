import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/suus-360-demo/',
  build: {
    outDir: 'dist',
  },
})
