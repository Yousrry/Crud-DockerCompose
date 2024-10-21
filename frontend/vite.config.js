import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Allow access from outside the container
    port: 3000,
    proxy: {
      // Proxy API requests to the backend service inside Docker
      '/api': {
        target: 'http://backend:5000',  // Docker service name for backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')  // Remove /api from the request
      }
    }
  }
})
