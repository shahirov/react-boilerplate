const paths = require('./paths')

module.exports = {
  contentBase: paths.public,
  contentBasePublicPath: paths.publicUrl,
  publicPath: paths.publicUrl.slice(0, -1),
  watchContentBase: true,
  clientLogLevel: 'none',
  overlay: false,
  hot: true,
  open: true,
  compress: true,
  quiet: true,
  historyApiFallback: {
    index: paths.publicUrl,
  },
  port: 8080,
}
