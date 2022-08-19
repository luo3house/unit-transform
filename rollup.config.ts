import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
// @ts-ignore
import bundleSize from 'rollup-plugin-bundle-size'

export default defineConfig({
  input: './src/index.ts',
  output: [
    {
      file: './dist/unit_transform.umd.js',
      format: 'umd',
      name: 'unit_transform',
      sourcemap: 'inline',
    },
    {
      file: './dist/unit_transform.umd.min.js',
      format: 'umd',
      name: 'unit_transform',
      plugins: [terser()],
    },
  ],
  plugins: [
    bundleSize(),
    nodeResolve({ extensions: ['.ts'] }),
    babel({ extensions: ['.ts'] }),
  ],
})
