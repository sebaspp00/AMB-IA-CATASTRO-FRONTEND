import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      // '@utils': path.resolve(__dirname, './src/utils'),
      // '@hooks': path.resolve(__dirname, './src/hooks'),
      // '@assets': path.resolve(__dirname, './src/assets'),
      // '@styles': path.resolve(__dirname, './src/styles'),
      // '@pages': path.resolve(__dirname, './src/pages'),
      // '@types': path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    port: 3000,
    host: true,
    allowedHosts: ["sinistrocular-nondecayed-adalyn.ngrok-free.dev"],
  },
})
