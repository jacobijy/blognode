import log4js from "log4js";
log4js.configure('./utils/config/log4js_conf.json');

const levels = {
    'trace': log4js.levels.TRACE,
    'debug': log4js.levels.DEBUG,
    'info': log4js.levels.INFO,
    'warn': log4js.levels.WARN,
    'error': log4js.levels.ERROR,
    'fatal': log4js.levels.FATAL
};

export default function logger(name) {
    if (name === '' || !name) name = 'default'
    var logger = log4js.getLogger(name);
    return logger;
} // 配合 express 使用的方法

export function use(app, level) {
    app.use(log4js.connectLogger(log4js.getLogger('http'), {
        level: levels[level] || levels['debug'],
        format: ':method :url :status'
    }));
}