const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

// const rollup = require('rollup');
// rollup.rollup({output: {}})

module.exports = {
  input: ['src/lib.ts'],
  plugins: [
    babel({
      babelHelpers: 'bundled', 
      extensions: ['.ts', '.js'],
      exclude: 'node-modules',
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