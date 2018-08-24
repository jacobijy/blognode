const webpack = require("webpack");
const config = require("./client/webpack.dev.ser.config");
const webpack_dev = require("webpack-dev-server");
const path = require("path");

let compiler = webpack(config);
let path_file = path.join(__dirname, "client/public/output/js");
console.log(path_file);
let server = new webpack_dev(compiler);
server.listen(3001);
