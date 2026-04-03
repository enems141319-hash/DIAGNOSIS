import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/DIAGNOSIS/',
  plugins: [react()],
  server: {
    host: true,
  },
  preview: {
    host: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
