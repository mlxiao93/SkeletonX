const fs = require('fs')
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const chokidar = require('chokidar');
const { debounce } = require('lodash');
const { terser } = require("rollup-plugin-terser");
const postcss = require('rollup-plugin-postcss');
const copy = require('rollup-plugin-copy');
const rollup = require('rollup');
const alias = require('@rollup/plugin-alias');
const replace = require('@rollup/plugin-replace');
const commonjs = require('@rollup/plugin-commonjs');
import { string } from "rollup-plugin-string";

if (process.env.NODE_ENV === 'dev') {
  const _copyAssets = debounce(copyAssets, 200)
  chokidar.watch([
    'src/chrome-extension/manifest.json',
    'src/chrome-extension/*.html'
  ]).on('all', () => {
    _copyAssets();
  })
} else {
  copyAssets();
}

function copyAssets() {
  fs.existsSync('chrome-extension') || fs.mkdirSync('chrome-extension');
  fs.copyFileSync('src/chrome-extension/manifest.json', 'chrome-extension/manifest.json')
  // fs.copyFileSync('src/chrome-extension/devtools.html', 'chrome-extension/devtools.html')
  fs.copyFileSync('src/chrome-extension/popup.html', 'chrome-extension/popup.html')
}


module.exports = [
  {
    input: [
      'src/chrome-extension/popup.ts',
      'src/chrome-extension/background.ts'
      // 'src/chrome-extension/devtools.ts',
    ],
    plugins: [
      babel({
        babelHelpers: 'bundled',
        extensions: ['.ts', '.js'],
      }),
      nodeResolve({
        extensions: ['.ts', '.js'] 
      }),
      postcss({
        extract: true,
        minimize: true,
        extensions: ['.css', '.scss']
      }),
      copy({
        targets: [
          { src: 'src/chrome-extension/images/**/*', dest: 'chrome-extension/images' }
        ]
      }),
      terser()
    ],
    output: {
      dir: 'chrome-extension',
      entryFileNames: '[name].js'
    },
    watch: {
      chokidar: true
    }
  },

  {
    input: [
      'src/chrome-extension/inject/index.ts'
    ],
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      commonjs(),
      alias({
        entries: [
          { find: 'react', replacement: 'preact/compat' },
          { find: 'react-dom', replacement: 'preact/compat' }
        ]
      }),
      postcss({
        extract: true,
        minimize: true,
        extensions: ['.scss']
      }),
      babel({
        babelHelpers: 'bundled', 
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        exclude: ['node-modules', '**/lib/global.js']
      }),
      nodeResolve({
        extensions: ['.tsx', '.ts', '.jsx', '.js'] 
      }),
      string({
        // Required to be specified
        include: ['**/lib/global.js', '**/lib/global.css', '**/templates/demo.html'],
      }),
      terser()
    ],
    output: {
      dir: 'chrome-extension/inject',
      entryFileNames: '[name].js',
    },
    watch: {
      chokidar: true
    }
  }
]