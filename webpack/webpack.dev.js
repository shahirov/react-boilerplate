const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const postcssNormalize = require('postcss-normalize')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const paths = require('./paths')
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    pathinfo: true,
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].chunk.js',
  },
  devServer: {
    contentBase: paths.appPublic,
    publicPath: paths.publicUrlOrPath,
    watchContentBase: true,
    compress: true,
    hot: true,
    open: true,
    stats: 'errors-only',
    port: 8000,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          compact: false,
        },
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                plugins: [
                  [
                    require.resolve('postcss-preset-env'),
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  postcssNormalize(),
                ],
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                plugins: [
                  [
                    require.resolve('postcss-preset-env'),
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  postcssNormalize(),
                ],
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
  ],
})
