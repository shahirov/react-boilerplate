const DotenvPlugin = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const paths = require('./paths')

module.exports = {
  context: paths.root,
  resolve: {
    extensions: paths.fileExtensions,
    plugins: [
      // Get aliases from tsconfig.json
      new TsconfigPathsPlugin(),
    ],
  },
  entry: paths.index,
  module: {
    rules: [],
    wrappedContextCritical: true,
    strictExportPresence: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: paths.indexHtml,
      favicon: paths.favicon,
    }),
    new DotenvPlugin({
      path: paths.env,
      expand: true,
      systemvars: true,
    }),
    new ESLintPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        enabled: true,
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
  performance: {
    hints: false,
  },
  optimization: {
    noEmitOnErrors: true,
    namedModules: true,
    namedChunks: true,
  },
  stats: {
    modules: false,
    chunks: false,
    children: false,
    timings: false,
    version: false,
  },
}
