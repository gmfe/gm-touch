const webpackFinal = config => {
  config.module.rules[0].include.push(/gm-/)
  config.module.rules[0].exclude = function(filepath) {
    return filepath.includes('/node_modules/')
  }

  config.module.rules[3] = {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
    loader:
      './node_modules/@storybook/core/node_modules/file-loader/dist/cjs.js',
    query: { name: 'static/media/[name].[hash:8].[ext]' }
  }

  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'less-loader'
      }
    ]
  })

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre'
  })

  config.module.rules.unshift({
    test: /svg\/(\w|\W)+\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          expandProps: 'start',
          svgProps: {
            fill: 'currentColor',
            className: "{'t-svg-icon ' + (props.className || '')}"
          }
        }
      }
    ]
  })

  config.module.rules.push({
    test: /\.tsx?$/,
    use: [require.resolve('babel-loader')]
  })

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}

module.exports = {
  // 枚举，避免识别到 node_modules 的 stories
  stories: [
    '../packages/react/src/**/*stories.js',
    '../packages/locales/src/**/*stories.js',
    '../packages/sortable/src/**/*stories.js'
  ],
  webpackFinal
}
