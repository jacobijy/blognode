const G = {
    __SERVER__: false,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
}
const webpack = require('webpack');
const path = require('path');

module.exports = {
    // 页面入口文件配置
    entry: {
        main: ['./client/public/javascripts/view/router/index.js']
    },
    // 入口文件输出配置
    output: {
        path: path.join(__dirname, 'public/output/js'),
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
                    presets: ['react']
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
        extensions: [' ', '.js', '.jsx', '.css', '.json', '.svg']
    },
    optimization: {

    },
    devtool: 'source-map',
    // 插件项
    plugins: [
        // new HtmlWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(G)
        // new OpenBrowserPlugin({
        // })
    ],

    devServer: {
        contentBase: "./client",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
}