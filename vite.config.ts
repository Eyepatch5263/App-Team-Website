import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '', // ✅ Crucial for Vercel + React Router (no leading slash or './')
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // ✅ Only if needed
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          lucide: ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://app-team-bf576154e11a.herokuapp.com/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
