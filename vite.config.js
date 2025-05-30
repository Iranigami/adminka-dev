import { defineConfig } from 'vite'
import postcss from './postcss.config.cjs'
import react from '@vitejs/plugin-react'

export default defineConfig({
  define: {
    'process.env': process.env
  },
  css: {
    postcss,
  },
  server: {
      host: true
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  } 
})
