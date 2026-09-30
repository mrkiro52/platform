import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Воркер с Python — модульный (Pyodide грузится через import), поэтому
  // и собирать его нужно как ES-модуль, а не как IIFE по умолчанию
  worker: { format: 'es' },
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
