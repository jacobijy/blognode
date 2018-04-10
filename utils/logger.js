import { config } from '../config';
import path from 'path';

var env = process.env.NODE_ENV || "development"

import { configure, getLogger } from "log4js";
configure('./utils/config/log4js_conf.json');

var logger = getLogger('default');
logger.level = 'debug';

module.exports = logger;