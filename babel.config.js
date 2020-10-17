const isTest = process.env.NODE_ENV === 'test'
const isDevelopment =
  process.env.WEBPACK_DEV_SERVER === 'true' ||
  process.env.NODE_ENV === 'development'

const presetReact = {
  development: isDevelopment,
  useBuiltIns: true,
}

const presetEnv = {
  loose: true,
  useBuiltIns: 'usage',
  corejs: 3,
  modules: isTest ? 'commonjs' : false,
  shippedProposals: true,
  bugfixes: true, // remove later in babel 8
}

const presetTypescript = {
  isTSX: true,
  allExtensions: true,
  onlyRemoveTypeImports: true,
}

const pluginStyledComponents = {
  displayName: isDevelopment,
  pure: true,
}

module.exports = {
  presets: [
    ['@babel/preset-env', presetEnv],
    ['@babel/preset-react', presetReact],
    ['@babel/preset-typescript', presetTypescript],
  ],
  plugins: [
    ['babel-plugin-styled-components', pluginStyledComponents],
    isDevelopment && 'react-refresh/babel',
  ].filter(Boolean),
}
