import GlobalPolyFill from '@esbuild-plugins/node-globals-polyfill';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteMarkdown, { Mode } from 'vite-plugin-markdown';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteMarkdown({ mode: [Mode.HTML] })],
  build: {
    target: 'esnext',
    sourcemap: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      // Enable esbuild polyfill plugins
      plugins: [
        GlobalPolyFill({
          buffer: true,
          process: process.env.MODE !== 'production',
        }),
      ],
      output: {
        manualChunks(id: string) {
          if (id.includes('apollo')) {
            return 'apollo';
          }
          if (id.includes('wagmi')) {
            return 'wagmi';
          }
          if (id.includes('react')) {
            return 'react';
          }
          if (id.includes('viem')) {
            return 'viem';
          }
          return null;
        },
      },
    },
  },
  define: {
    globalThis: 'window',
  },
  // resolve: {
  //   alias: {
  //     process: 'process/browser',
  //     '@': path.resolve(__dirname, './src/'),
  //   },
  // },
  resolve: {
    alias: {
      // polyfills
      Buffer: 'vite-compatible-readable-buffer',
      stream: 'vite-compatible-readable-stream',
      util: 'rollup-plugin-node-polyfills/polyfills/util',
    },
  },
  optimizeDeps: {
    disabled: false,
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
