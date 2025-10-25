import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/mock': {
        target: 'https://demo6694663.mockable.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock/, ''),
      },
    },
  },
})
