const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const postcss = require('rollup-plugin-postcss');

// const rollup = require('rollup');
// rollup.rollup({output: {}})

module.exports = {
  input: ['src/lib/index.ts'],
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
    }),
  ],
  output: {
    // sourcemap: true,
    name: '__skeleton__x__lib',
    dir: 'lib',
    entryFileNames: 'index.js',
    // format: 'umd',
    format: 'iife'
  },
  watch: {
    chokidar: true
  }
}