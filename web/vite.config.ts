import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    nodePolyfills({
      protocolImports: true
    })
  ],
  server: {
    host: true
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true
        })
      ]
    }
  },
  build: {
    rollupOptions: {
      // Enable rollup polyfills plugin
      // used during production bundling
      plugins: [nodePolyfills()]
    }
  }
});
