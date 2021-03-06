const { rollup } = require('rollup')
const { resolve } = require('path')
const autoExternal = require('rollup-plugin-auto-external')
const typescript = require('rollup-plugin-typescript2')
const { terser } = require('rollup-plugin-terser')

const entrypoint = resolve(`${process.cwd()}/src/index.ts`)
const distPath = resolve(`${process.cwd()}/dist/index.js`)
const cacheRoot = resolve(__dirname, '../.cache')
const testdir = resolve(`${process.cwd()}/test`)

const tsconfigDefaults = {
  exclude: ['**/__tests__/**/*'],
}

function build() {
  rollup({
    input: entrypoint,
    plugins: [
      autoExternal(),
      typescript({
        cacheRoot,
        tsconfigDefaults,
        useTsconfigDeclarationDir: true,
      }),
      terser(),
    ],
  })
    .then(bundle => bundle.write({ file: distPath, format: 'cjs' }))
    .catch(err => console.error(err) || process.exit(1))
}

module.exports = build
