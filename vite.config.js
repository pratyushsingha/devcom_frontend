import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ecommerce': {
        target: 'https://freeapi-app-production-846b.up.railway.app/api/v1',
        changeOrigin: true,
      },
      '/users': {
        target: 'https://freeapi-app-production-846b.up.railway.app/api/v1/',
        changeOrigin: true,
      },
    },
  },
});
