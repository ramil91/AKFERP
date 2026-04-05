import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.join(rootDir, 'src'),
    },
  },
  server: {
    port: 5173,
    // Proxy API in dev to avoid CORS when hitting local AKFERP.API
    proxy: {
      '/api': {
        // Match AKFERP.API Properties/launchSettings.json (https profile).
        target: 'https://localhost:7192',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
