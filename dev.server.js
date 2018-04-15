const webpack = require('webpack');
const config = require('./client/webpack.config');
const webpack_dev = require('webpack-dev-server');
const path = require('path');

// config.entry.main.unshift("webpack-dev-server/client?http://localhost:8080/");
let compiler = webpack(config);
let server = new webpack_dev(compiler, {
  // contentBase: 'client/',
  // publicPath: path.join(__dirname, 'public/output/js')
});
server.listen(8080);