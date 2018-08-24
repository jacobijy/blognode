const G = {
	__DEVELOPMENT__: true,
	__DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
}
const webpack = require('webpack');
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	// 页面入口文件配置
	entry: {
		main: './client/public/javascripts/view/router/index.js'
	},
	// 入口文件输出配置
	output: {
		path: path.join(__dirname, 'public/output/js'),
		publicPath: '/assets/',
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
	optimization: {

	},

	devServer: {
		contentBase: "./client",//本地服务器所加载的页面所在的目录
		historyApiFallback: true,//不跳转
		inline: true//实时刷新
	},

	devtool: 'source-map',

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new BundleAnalyzerPlugin({
			analyzerHost: '0.0.0.0'
		}),
		new webpack.DefinePlugin(G)
	]
}