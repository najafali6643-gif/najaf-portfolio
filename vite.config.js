import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined

          if (
            id.includes('react-router') ||
            id.includes('react-dom') ||
            id.includes('react/') ||
            id.includes('scheduler')
          ) {
            return 'react'
          }

          if (id.includes('framer-motion') || id.includes('motion-dom')) {
            return 'motion'
          }

          if (id.includes('gsap') || id.includes('lenis')) {
            return 'animation'
          }

          return 'vendor'
        },
      },
    },
  },
})