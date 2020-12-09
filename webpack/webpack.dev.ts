import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import postcssNormalize from 'postcss-normalize'
import webpack, { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import merge from 'webpack-merge'

import paths from './paths'
import baseConfig from './webpack.base'

// eslint-disable-next-line import/no-default-export
export default merge<WebpackConfiguration & WebpackDevServerConfiguration>(
  baseConfig,
  {
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
      pathinfo: true,
      filename: 'js/bundle.js',
      chunkFilename: 'js/[name].chunk.js',
    },
    devServer: {
      compress: true,
      clientLogLevel: 'silent',
      contentBase: paths.appPublic,
      contentBasePublicPath: paths.publicUrlOrPath,
      watchContentBase: true,
      hot: true,
      publicPath: paths.publicUrlOrPath,
      quiet: true,
      host: 'localhost',
      open: true,
      historyApiFallback: {
        disableDotRule: true,
      },
      port: 3000,
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
                ident: 'postcss',
                postcssOptions: [],
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
                ident: 'postcss',
                postcssOptions: [],
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
  },
)
