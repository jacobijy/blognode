var webpack = require('webpack');

module.exports = {
  // 页面入口文件配置
  entry: {
    main: './client/public/javascripts/view/main/index.js'
  },
  // 入口文件输出配置
  output: {
    path: __dirname + '/output/js/',
    filename: '[name].bundle.js'
  },
  module: {
    // 加载器配置
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader!jsx-loader?harmony'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  // 其他解决方案配置
  resolve: {
    extensions: [' ', '.js', '.jsx', '.css', '.json'],
  },
  // 插件项
  plugins: [
  ]
}