import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  base: '',
  plugins: [react(),
  sitemap({
    hostname: 'https://appteam.nith.ac.in',
    outDir: 'dist',
    generateRobotsTxt: true
  })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
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
