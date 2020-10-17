const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { merge } = require('webpack-merge')

const { productionConfig } = require('./webpack.prod')

module.exports = merge(productionConfig, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: 'localhost',
      analyzerPort: 8888,
      defaultSizes: 'parsed',
      openAnalyzer: false,
      logLevel: 'info',
    }),
  ],
  stats: {
    chunkGroups: true,
    chunks: true,
    chunkModules: false,
    chunkOrigins: true,
    errorDetails: true,
  },
  profile: true,
})
