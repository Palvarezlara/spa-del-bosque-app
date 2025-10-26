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
  test: {
    globals: true,              // para usar expect(), describe(), etc.
    environment: 'jsdom',       // simula el DOM en Node
    setupFiles: './tests/setup.js', // importa jest-dom automáticamente
    coverage: {
      provider: 'v8',           // usa el motor de cobertura de Chrome
      reporter: ['text', 'html'], // genera reporte en consola y en HTML
      all: true,
    include: ['src/components/auth/LoginForm.jsx',
        'src/components/CardServicio.jsx',
        'src/pages/Perfil.jsx',
      ],
    
    thresholds: undefined,
    },
  },

})
