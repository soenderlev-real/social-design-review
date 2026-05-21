import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    watch: {
      // Ignore slow/network-mounted paths (OneDrive etc.) in the home directory
      ignored: ['**/Library/**', '**/node_modules/**'],
    },
  },
  optimizeDeps: {
    exclude: ['pdfjs-dist'],
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
})
