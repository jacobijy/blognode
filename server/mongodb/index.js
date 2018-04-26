import mongoose from 'mongoose'
import logger from "../../utils/logger";
import { config } from '../../config';

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


// models
import './counter'
import './users';
import './article';
import './attachment';

export var User = mongoose.model('User');
export var Article = mongoose.model('Article');
export var Attachment = mongoose.model('Attachment');
export var Counter = mongoose.model('Counter');