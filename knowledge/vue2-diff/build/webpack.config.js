const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist2'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: false,
    inline: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ]
}