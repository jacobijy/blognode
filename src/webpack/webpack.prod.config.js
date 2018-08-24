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
        path: path.join(__dirname, '../dist/'),
        filename: '[name].bundle.js'
    },

    module: {
        // 加载器配置
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },

            { test: /\.css$/, loader: 'style-loader!css-loader' },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },

            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    // 其他解决方案配置
    resolve: {
        extensions: [' ', '.js', '.jsx', '.css', '.json', '.svg']
    },

    // 插件项
    plugins: [
        new webpack.DefinePlugin(G),
        new webpack.DefinePlugin({
            'process.env': {
                // Useful to reduce the size of client-side libraries, e.g. react
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
}