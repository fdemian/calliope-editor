import esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'
import cssModulesPlugin from 'esbuild-css-modules-plugin';

esbuild.build({
  entryPoints: ['src/Calliope/index.ts'],
  loader: { '.js': 'jsx', '.svg': 'text' },
  outdir: 'dist',
  bundle: true,
  sourcemap: true,
  minify: true,
  splitting: true,
  format: 'esm',
  target: 'esnext',
  plugins: [
    nodeExternalsPlugin(),
    cssModulesPlugin({
     inject: false,
     localsConvention: 'camelCaseOnly', // optional. value could be one of 'camelCaseOnly', 'camelCase', 'dashes', 'dashesOnly', default is 'camelCaseOnly'
     generateScopedName: (name, filename, css) => string, // optional. refer to: https://github.com/madyankin/postcss-modules#generating-scoped-names
     v2: true
   })
  ]
})
