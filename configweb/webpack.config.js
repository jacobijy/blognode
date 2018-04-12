const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 页面入口文件配置
  entry: {
    main: './client/public/javascripts/view/router/index.js'
  },
  // 入口文件输出配置
  output: {
    path: __dirname + '/client/output/js/',
    filename: '[name].bundle.js'
  },

  module: {
    // 加载器配置
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ]
  },
  // 其他解决方案配置
  resolve: {
    extensions: [' ', '.js', '.jsx', '.css', '.json', '.svg'],
  },
  optimization: {

  },
  // 插件项
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}