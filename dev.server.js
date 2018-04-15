const webpack = require('webpack');
const config = require('./client/webpack.config');
const webpack_dev = require('webpack-dev-server');
const path = require('path');

config.entry.unshift("webpack-dev-server/client?http://192.168.137.78:3000/");
console.log(config.entry);
let compiler = webpack(config);
let path_file = path.join(__dirname, 'client/public/output/js');
console.log(path_file);
let server = new webpack_dev(compiler, {
  contentBase: 'client/',
  publicPath: '/assets/'
});
server.listen(3000);