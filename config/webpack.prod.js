const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const paths = require('./paths')
const createRules = require('./rules')
const common = require('./webpack.common')

const testModules = (names) => (chunk) =>
  Boolean(chunk.resource) &&
  names.some((name) =>
    chunk.resource.startsWith(`${paths.root}/node_modules/${name}/`),
  )

module.exports = merge(common, {
  mode: 'production',
  bail: true,
  devtool: false,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: paths.outputProd.js,
    chunkFilename: paths.outputProd.js,
  },
  module: {
    rules: createRules(),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.SourceMapDevToolPlugin({
      noSources: true,
    }),
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
    }),
    new MiniCssExtractPlugin({
      filename: paths.outputProd.css,
      chunkFilename: paths.outputProd.css,
    }),
  ],
  optimization: {
    noEmitOnErrors: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxAsyncRequests: 16,
      maxInitialRequests: 6,
      cacheGroups: {
        polyfills: {
          test: testModules(['core-js']),
          enforce: true,
          reuseExistingChunk: true,
        },
        react: {
          test: testModules(['react', 'react-dom', 'scheduler']),
          name: 'react',
          enforce: true,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: false,
        sourceMap: false,
        extractComments: false,
        terserOptions: {
          mangle: {
            safari10: true,
          },
          output: {
            comments: false,
            safari10: true,
          },
          compress: {
            comparisons: false,
          },
        },
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
        },
        assetNameRegExp: paths.patterns.css,
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              normalizeUnicode: false,
              minifyFontValues: { removeQuotes: false },
            },
          ],
        },
      }),
    ],
  },
})
