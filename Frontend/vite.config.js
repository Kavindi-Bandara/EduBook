// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      // forward API calls to backend service in Docker
      '/api': {
        target: 'http://backend:4000',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
