const path = require('path')

const fileExtensions = ['.js', '.ts', '.tsx', '.json', '.jsx']

module.exports = {
  root: path.resolve(__dirname, '..'),
  build: path.resolve(__dirname, '../build'),
  index: path.resolve(__dirname, '../src/index'),
  indexHtml: path.resolve(__dirname, '../public/index.html'),
  env: path.resolve(__dirname, '../.env'),
  public: path.resolve(__dirname, '../public'),
  favicon: path.resolve(__dirname, '../public/favicon.ico'),
  patterns: {
    js: /\.(js|jsx|ts|tsx)$/,
    file: /\.(jpg|png|gif|woff2)$/,
    svg: /\.(svg)$/,
    css: /\.(css)$/,
  },
  outputDev: {
    assets: path.normalize('[path][name].[ext]'),
    js: path.normalize('js/[name].js'),
    css: path.normalize('css/[name].css'),
  },
  outputProd: {
    assets: path.normalize('assets/[name].[contenthash:8].[ext]'),
    js: path.normalize('js/[name].[contenthash:8].js'),
    css: path.normalize('css/[name].[contenthash:8].css'),
  },
}

module.exports.fileExtensions = fileExtensions
