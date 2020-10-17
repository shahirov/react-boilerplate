const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const normalize = require('postcss-normalize')
const presetEnv = require('postcss-preset-env')

const paths = require('./paths')

const isDevelopment =
  process.env.WEBPACK_DEV_SERVER === 'true' ||
  process.env.NODE_ENV === 'development'

module.exports = (options = {}) => {
  const js = {
    test: paths.patterns.js,
    include: paths.source,
    use: ['babel-loader'],
  }

  const css = {
    test: paths.patterns.css,
    use: [
      isDevelopment
        ? 'style-loader'
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: isDevelopment,
            },
          },
      {
        loader: 'css-loader',
        options: {
          sourceMap: isDevelopment,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              presetEnv({
                stage: 2,
                autoprefixer: {
                  flexbox: 'no-2009',
                  grid: 'autoplace',
                },
              }),
              normalize(),
            ],
            sourceMap: isDevelopment,
          },
        },
      },
    ],
  }

  const svg = {
    test: paths.patterns.svg,
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
  }

  const assets = {
    test: paths.patterns.file,
    use: {
      loader: 'file-loader',
      options: {
        context: paths.source,
        name: isDevelopment ? paths.outputDev.assets : paths.outputProd.assets,
      },
    },
  }

  return options.excludeJs ? [css, svg, assets] : [js, css, svg, assets]
}
