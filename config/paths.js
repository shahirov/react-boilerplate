const path = require('path')

const fileExtensions = ['js', 'ts', 'tsx', 'json', 'jsx']

module.exports = {
  index: path.resolve(__dirname, 'src/index'),
  src: path.resolve(__dirname, 'src'),
  html: path.resolve(__dirname, 'public/index.html'),
  nodeModules: path.resolve(__dirname, 'node_modules'),
  public: path.resolve(__dirname, 'public'),
  build: path.resolve(__dirname, 'build'),
  tsConfig: path.resolve(__dirname, 'tsconfig.json'),
  dotenv: path.resolve(__dirname, '.env'),
  publicUrl: '/',
}

module.exports.fileExtensions = fileExtensions
