const fs = require('fs')
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const postcss = require('rollup-plugin-postcss');
const replace = require('@rollup/plugin-replace');
const commonjs = require('@rollup/plugin-commonjs');
const copy = require('rollup-plugin-copy');

// const rollup = require('rollup');
// rollup.rollup({
//   output: {}
// })

module.exports = [{
  input: ['src/lib/global.ts'],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.js'],
      exclude: 'node-modules',
    }),
    postcss({
      extract: true,
      minimize: true,
      extensions: ['.css', '.scss']
    }),
    nodeResolve({
      extensions: ['.ts', '.js']
    })
  ],
  output: {
    // sourcemap: true,
    name: '__skeleton__x__lib',
    dir: 'lib',
    entryFileNames: 'global.js',
    format: 'iife'
  },
  watch: {
    chokidar: true
  }
}, {
  input: ['src/lib/react/index.tsx'],
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled', 
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      exclude: 'node-modules'
    }),
    nodeResolve({
      extensions: ['.tsx', '.ts', '.jsx', '.js'] 
    }),
  ],
  external: ['react'],
  output: {
    dir: 'lib/react',
    format: 'esm',
    entryFileNames: 'index.js'
  }
}]