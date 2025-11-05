import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.AI_INTEGRATIONS_OPENAI_BASE_URL': JSON.stringify(process.env.AI_INTEGRATIONS_OPENAI_BASE_URL),
    'import.meta.env.AI_INTEGRATIONS_OPENAI_API_KEY': JSON.stringify(process.env.AI_INTEGRATIONS_OPENAI_API_KEY),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true,
    hmr: {
      clientPort: 5000,
    },
    watch: {
      ignored: [
        '**/.local/**',
        '**/.cache/**',
        '**/.replit',
        '**/replit.nix',
        '**/node_modules/**',
      ],
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
  },
});
