const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const paths = require('./paths')
const createRules = require('./rules')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: paths.build,
    publicPath: '/',
    pathinfo: true,
    filename: paths.outputDev.js,
    chunkFilename: paths.outputDev.js,
  },
  module: {
    rules: createRules(),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: paths.outputDev.css,
      chunkFilename: paths.outputDev.css,
    }),
    new ErrorOverlayPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin(),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
  ],
  devtool: 'eval-source-map',
  devServer: {
    quiet: true,
    hot: true,
    contentBase: paths.public,
    watchContentBase: true,
    publicPath: '/',
    open: true,
    compress: true,
    clientLogLevel: 'error',
    historyApiFallback: {
      disableDotRule: true,
    },
    host: 'localhost',
    port: 8000,
  },
  optimization: {
    concatenateModules: false,
    minimize: false,
    runtimeChunk: true,
  },
  stats: {
    performance: false,
    assets: false,
    entrypoints: false,
  },
})
