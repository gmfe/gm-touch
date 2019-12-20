const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      { test: /\.(js|jsx)?$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.ts|\.tsx$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
}
