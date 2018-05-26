import mongoose from 'mongoose';
import { config } from '../../config';
import logger from "../../utils/logger";
// models
import './counter';
import './users';
import './article';
import './attachment';
import './comment';

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

export const User = mongoose.model('User');
export const Article = mongoose.model('Article');
export const Attachment = mongoose.model('Attachment');
export const Counter = mongoose.model('Counter');
export const Comment = mongoose.model('Comment');