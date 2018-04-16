import mongoose from 'mongoose'
import logger from "../../utils/logger";
import { config } from '../../config';
import { Grid } from "gridfs-stream";

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
const connection = mongoose.connection;

connection.once('open', () => {
  
})

// models
import './users';
import './articale';

export var User = mongoose.model('User');
export var Articale = mongoose.model('Article');