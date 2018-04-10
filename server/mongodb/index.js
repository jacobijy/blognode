import mongoose from 'mongoose'
import logger from "../../utils/logger";
import config from '../../config';
mongoose.connect(config.mongodb_conf, {
  server: { poolSize: 20 }
}, function (err) {
  if (err) {
    logger.log(config.mongodb_conf);
    logger.error('connect to %s error: ', config.mongodb_conf, err.message);
    process.exit(1);
  }
}
);

// models
require('./users');

exports.User = mongoose.model('User');