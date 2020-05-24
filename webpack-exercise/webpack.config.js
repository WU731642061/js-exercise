// 开发环境配置

const path = require("path")
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "./js/app.js",
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    // esModule: false,
                    outputPath: 'img'
                }
            },
            {
                exclude: /\.(html|css|scss|js|png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: "development",
    devServer: {
        contentBase: path.resolve(__dirname, ' build'),
        compress: true,
        port: 3001, 
        open: true
    }
} 