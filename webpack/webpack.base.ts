import DotenvPlugin from 'dotenv-webpack'
import ESLintPlugin from 'eslint-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import webpack from 'webpack'

import paths, { moduleFileExtensions } from './paths'

const baseConfig: webpack.Configuration = {
  context: paths.appPath,
  entry: paths.appIndexJs,
  output: {
    publicPath: paths.publicUrlOrPath,
    assetModuleFilename: 'assets/[name].[hash:8].[ext]',
  },
  resolve: {
    extensions: moduleFileExtensions.map((extension) => `.${extension}`),
    plugins: [new TsconfigPathsPlugin({ configFile: paths.appTsConfig })],
  },
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.avif$/],
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: [
          require.resolve('babel-loader'),
          {
            loader: '@svgr/webpack',
            options: {
              ref: true,
              memo: true,
              babel: false,
              prettier: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
            },
          },
        ],
      },
    ],
    strictExportPresence: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      favicon: paths.appFavicon,
    }),
    new DotenvPlugin({
      path: paths.dotenv,
      expand: true,
      systemvars: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: paths.appTsConfig,
      },
      eslint: {
        enabled: true,
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      context: paths.appSrc,
      cwd: paths.appPath,
      resolvePluginsRelativeTo: __dirname,
    }),
  ],
  performance: {
    hints: false,
  },
  stats: {
    modules: false,
    chunks: false,
    children: false,
    timings: false,
    version: false,
  },
}

// eslint-disable-next-line import/no-default-export
export default baseConfig
