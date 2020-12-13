const DotenvPlugin = require('dotenv-webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const paths = require('./paths')
const { moduleFileExtensions } = require('./paths')

module.exports = {
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
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      eslintPath: require.resolve('eslint'),
      context: paths.appSrc,
      cwd: paths.appPath,
      resolvePluginsRelativeTo: __dirname,
      cache: true,
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
