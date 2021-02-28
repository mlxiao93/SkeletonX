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
  fs.copyFileSync('src/chrome-extension/devtools.html', 'chrome-extension/devtools.html')
  fs.copyFileSync('src/chrome-extension/popup.html', 'chrome-extension/popup.html')
}


module.exports = [
  {
    input: [
      'src/chrome-extension/background.ts',
      'src/chrome-extension/devtools.ts',
      'src/chrome-extension/popup.ts'
    ],
    plugins: [
      babel({
        babelHelpers: 'bundled',
        extensions: ['.ts', '.js'],
      }),
      nodeResolve({
        extensions: ['.ts', '.js'] 
      }),
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
        extensions: ['.css', '.scss']
      }),
      babel({
        babelHelpers: 'bundled', 
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        exclude: 'node-modules'
      }),
      nodeResolve({
        extensions: ['.tsx', '.ts', '.jsx', '.js'] 
      }),
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