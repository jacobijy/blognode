import { configure, getLogger } from "log4js";
configure('./utils/config/log4js_conf.json');

var logger = getLogger('default');
logger.level = 'debug';

export default logger