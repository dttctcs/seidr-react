import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import EsLint from 'vite-plugin-linter'
//const { EsLinter, linterPlugin } = EsLint
import * as packageJson from './package.json'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    //linterPlugin({
    //  include: ['./src}/**/*.{js,jsx}'],
    //  linters: [new EsLinter({ configEnv })],
    //}),
    //dts({
    //  include: ['src/components/'],
    //}),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, 'src') }],
  },
  build: {
    lib: {
      entry: resolve('src', 'index.js'),
      name: 'SeidrReact',
      formats: ['es', 'umd'],
      fileName: (format) => `seidr-react.${format}.js`,
    },
    //rollupOptions: {
    //  external: [...Object.keys(packageJson.peerDependencies)],
    //},
  },
}))