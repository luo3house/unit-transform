import { defineConfig } from 'rollup'
import swc from 'rollup-plugin-swc3'
import path from 'path'

const input = './src/index.ts'
const outDir = './dist'
const name = 'unit_transform'
const fileName = 'index'

function buildCJS() {
  return defineConfig({
    input: input,
    output: {
      file: path.join(outDir, `${fileName}.cjs`),
      format: 'cjs',
    },
    plugins: [
      // plugins.resolve,
      swc({
        jsc: {
          target: 'es5',
          parser: { syntax: 'typescript', tsx: false },
        },
      }),
    ],
  })
}

function buildESM() {
  return defineConfig({
    input: input,
    output: {
      file: path.join(outDir, `${fileName}.mjs`),
      format: 'esm',
    },
    plugins: [
      // plugins.resolve,
      swc({
        jsc: {
          target: 'es2015',
          parser: { syntax: 'typescript', tsx: false },
        },
      }),
    ],
  })
}

function buildIIFE() {
  return defineConfig({
    input: input,
    output: {
      file: path.join(outDir, `${fileName}.iife.js`),
      format: 'iife',
      name,
    },
    plugins: [
      // plugins.resolve,
      swc({
        jsc: {
          target: 'es5',
          parser: { syntax: 'typescript', tsx: false },
        },
        minify: true,
      }),
    ],
  })
}

export default defineConfig([buildCJS(), buildESM(), buildIIFE()])
