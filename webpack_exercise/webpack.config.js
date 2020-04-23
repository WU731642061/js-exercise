// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode:'development', // 开发模式
  // mode: 'production',  // 
  devtool: 'inline-source-map', // 当多个源打包成一个文件时，可以帮助追溯错误的源文件位置
   devServer: {
    contentBase: './dist'
  }, // 提供一个简单的服务器，可以实现实时刷新页面
  // entry: path.resolve(__dirname,'src/main.js'), // 入口文件，单入口文件时的写法
  entry: {
    main: './src/main.js',
    print: './src/print.js'
  },

  output: {
    filename: '[name].bundle.js',  // 打包后的文件名称
    path: path.resolve(__dirname,'dist')  // 打包后的目录
  },
  // 配置loader
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 预处理css文件，我发现这边css预处理是有先后顺序的，必须先进行style-loader处理，才能编译成功，否则报错
      { test: /\.ts$/, use: 'ts-loader' }, // 预处理ts文件
      { test:/\.(png|svg|jpg|gif)$/, use: 'file-loader'}
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ title: 'Output Management' }),  // 一个插件，作用是生成新的index.html，这样你在动态的修改入口文件和出口文件时，会替换你的index.html，但是问题是，如果你在index.html上添加任何代码，重新构建时会消失
  ]
}


webpackMuti = {
  mode:'development', // 开发模式
  entry: {
    main: './src/main.js',  // 当希望项目是一个多页面应用程序时
    sub: './src/sub.js',
    // ... 支持更多的入口文件，在多页面应用中，服务器将为你获取一个新的 HTML 文档。页面重新加载新文档，并且资源被重新下载
  },
  output: {
    filename: '[name].js', // 当项目不只有一个入口时，需要用到占位符来确保每个文件具有唯一的名称
    path: __dirname + '/dist'
  }
}

// 另一种配置mode的方法就是在cli中传递参数
// webpack --mode=production
// 目前mode仅有两种选项development和production，区别如下：
// development 会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
// production 会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
// 关于这些插件都有什么用，可能会在后面提到，也可以看官网文档

// 关于loader
// 根据官方文档的说法，loader的作用就是将不同文件的内容，转换为js代码，并允许你通过import的方式引入，webpack会帮你把这些文件转换成js可读的内容
// 官方文档一共给了3中写法，配置，内联和cli，后面两种写法估计不会有人真的会频繁使用吧，可读性差，不易于错误定位，如果真的遇到了，老老实实看文档吧，233333，然后锤这么写的人一顿
