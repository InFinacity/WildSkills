import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/WildSkills/",
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // Polyfill global
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true, // Polyfill process
          buffer: true,  // Polyfill Buffer
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill(), // Rollup plugin for Node.js polyfills
      ],
    },
  },
  resolve: {
    alias: {
      process: 'process/browser',
      Buffer: 'buffer',
    },
  },
  /*
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }*/
})
