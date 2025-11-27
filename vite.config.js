import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibraryMode = mode === 'library';

  return {
    plugins: [
      react({
        // Usar classic JSX runtime en modo librería para compatibilidad con UMD
        jsxRuntime: isLibraryMode ? 'classic' : 'automatic',
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@services': path.resolve(__dirname, './src/services'),
        '@contexts': path.resolve(__dirname, './src/contexts'),
      },
    },
    // Configuración del build
    build: isLibraryMode ? {
      lib: {
        entry: path.resolve(__dirname, 'src/widget.jsx'),
        name: 'ChatWidget',
        formats: ['es', 'umd'],
        fileName: (format) => `chat-widget.${format}.js`,
      },
      rollupOptions: {
        // Externalizar dependencias peer
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          // Asegurar que el CSS se genere correctamente
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') {
              return 'amb-ia-chat-widget.css';
            }
            return assetInfo.name;
          },
        },
      },
      // Generar sourcemaps para debugging
      sourcemap: true,
      // Optimizar el build con esbuild (incluido con Vite)
      minify: 'esbuild',
      // Asegurar que el CSS se incluya en el build
      cssCodeSplit: false,
    } : {},
    // Configuración del servidor de desarrollo
    server: {
      port: 8080,
      host: true,
      allowedHosts: ["sinistrocular-nondecayed-adalyn.ngrok-free.dev"],
    },
  };
})
