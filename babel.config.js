module.exports = (api) => {
  // This caches the Babel config by environment.
  api.cache.using(() => process.env.NODE_ENV)
  return {
    presets: [
      '@babel/preset-typescript',
      '@babel/preset-react',
      '@babel/preset-env',
    ],
    plugins: [
      'babel-plugin-styled-components',
      // Applies the react-refresh Babel plugin on non-production modes only
      api.env('development') && 'react-refresh/babel',
    ].filter(Boolean),
  }
}
