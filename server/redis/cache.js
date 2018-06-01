import redis from '.';
import logger from '../../utils/logger';

export async function get(key) {
    let t = new Date();
    try {
        let value = await redis.get(key);
        const data = JSON.parse(value);

        var duration = (new Date() - t);
        logger('default').debug('Cache', 'get', key, (duration + 'ms').green);
        return data;
    } catch (err) {
        return err;
    }
}

export async function set(key, value, time) {
    let t = new Date();
    try {
        let result;
        value = JSON.stringify(value);
        if (time) {
            result = await redis.setex(key, time, value);
        }
        else {
            result = await redis.set(key, value);
        }
        let duration = (new Date() - t);
        logger('default').debug("Cache", "set", key, (duration + 'ms').green);
        return result;
    } catch (err) {
        return err;
    }
}