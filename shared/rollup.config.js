import {defineConfig} from 'rollup'

export default defineConfig({
  input: 'index.js',
  output: {
    file: 'index.cjs',
    format: 'cjs',
  },

  external:['zod']
})
