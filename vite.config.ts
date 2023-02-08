/// <reference types="vitest" />
/// <reference types="vite/client" />
import path from 'path'
import { defineConfig } from 'vite'
import unocss from 'unocss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), unocss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true
  }
})
