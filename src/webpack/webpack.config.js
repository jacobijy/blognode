const G = {
    __SERVER__: false,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
}
const webpack = require('webpack');
const path = require('path');

module.exports = {
    // 页面入口文件配置
    entry: ['./client/public/javascripts/view/router/index.js'],
    // 入口文件输出配置
    output: {
        path: path.join(__dirname, 'public/output/js'),
        filename: '[name].bundle.js'
    },

    module: {
        // 加载器配置
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },

            { test: /\.css$/, loader: 'style-loader!css-loader'},

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    // 其他解决方案配置
    resolve: {
        extensions: [' ', '.ts', '.tsx', '.css', '.json', '.svg']
    },
    optimization: {

    },
    // 插件项
    plugins: [
        // new HtmlWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(G)
        // new OpenBrowserPlugin({
        // })
    ],

    devServer: {
        contentBase: "./views",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
}