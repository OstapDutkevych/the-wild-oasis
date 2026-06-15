import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            '@ui': fileURLToPath(new URL('./src/ui', import.meta.url)),
            '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
            '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
            '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
            '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
        },
    },
  plugins: [
      react(),
      eslint({
        emitWarning: true,
        emitError: true,
        failOnWarning: false,
        failOnError: false
      })
  ],
})
