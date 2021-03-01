// const { babel } = require('@rollup/plugin-babel');
// const { nodeResolve } = require('@rollup/plugin-node-resolve');
// const commonjs = require('@rollup/plugin-commonjs');
// const postcss = require('rollup-plugin-postcss');
// const replace = require('@rollup/plugin-replace');
// const { terser } = require("rollup-plugin-terser");
// const alias = require('@rollup/plugin-alias');
// const html = require('@rollup/plugin-html');
// const copy = require('rollup-plugin-copy');

// module.exports = {
//   input: ['src/panel-app/index.tsx'],
//   plugins: [
//     replace({
//       preventAssignment: true,
//       'process.env.NODE_ENV': JSON.stringify('production')
//     }),
//     commonjs(),
//     alias({
//       entries: [
//         { find: 'react', replacement: 'preact/compat' },
//         { find: 'react-dom', replacement: 'preact/compat' }
//       ]
//     }),
//     postcss({
//       extract: 'index.css',
//       minimize: true,
//       extensions: ['.css', '.scss']
//     }),
//     babel({
//       babelHelpers: 'bundled', 
//       extensions: ['.tsx', '.ts', '.jsx', '.js'],
//       exclude: 'node-modules'
//     }),
//     nodeResolve({
//       extensions: ['.tsx', '.ts', '.jsx', '.js'] 
//     }),
//     copy({
//       targets: [{ src: 'src/panel-app/index.html', dest: 'chrome-extension/panel-app' }]
//     })
//     // html()
//   ],
//   output: {
//     // sourcemap: true,
//     dir: 'chrome-extension/panel-app',
//     entryFileNames: 'index.js'
//   },
//   watch: {
//     chokidar: true
//   }
// }