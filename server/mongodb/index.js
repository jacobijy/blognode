import mongoose from 'mongoose';
import { config } from '../../config';
import logger from "../../utils/logger";
// models
import './counter';
import './users';
import './article';
import './attachment';

mongoose.connect(config.mongodb_conf, {
  server: { poolSize: 20 }
}, (err) => {
  if (err) {
    logger.log(config.mongodb_conf);
    logger.error('connect to %s error: ', config.mongodb_conf, err.message);
    process.exit(1);
  }
}
);

export var User = mongoose.model('User');
export var Article = mongoose.model('Article');
export var Attachment = mongoose.model('Attachment');
export var Counter = mongoose.model('Counter');