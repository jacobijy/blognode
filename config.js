import path from 'path';

const config = {
  port : 3000,
  mongodb_conf : "mongodb://localhost:27017/blog",
  debug: true,
  log_dir: path.join(__dirname, 'logs')
}

module.exports = config;