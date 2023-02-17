import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import GlobalPolyFill from '@esbuild-plugins/node-globals-polyfill';
import * as path from 'path';
import viteMarkdown, { Mode } from 'vite-plugin-markdown';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteMarkdown({ mode: [Mode.HTML] })],
  build: {
    target: 'modules',
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      // Enable esbuild polyfill plugins
      plugins: [
        GlobalPolyFill({
          buffer: true,
          process: true,
        }),
      ],
    },
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      process: 'process/browser',
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        GlobalPolyFill({
          buffer: true,
          process: true,
        }),
      ],
    },
  },
  preview: {
    port: 3001,
  },
});
