const DotenvPlugin = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const paths = require('./paths')

module.exports = {
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    publicPath: paths.publicUrlOrPath,
    assetModuleFilename: 'assets/[name].[hash:8].[ext]',
  },
  resolve: {
    extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
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
      eslint: {
        files: '../src/**/*.{ts,tsx,js,jsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      context: paths.appSrc,
      cwd: paths.appPath,
      resolvePluginsRelativeTo: __dirname,
    }),
  ],
}
