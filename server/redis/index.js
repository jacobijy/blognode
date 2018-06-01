import Redis from 'ioredis';
import { config } from '../../config';
import logger from '../../utils/logger';

const client = new Redis({
    port: config.redis_port,
    host: config.redis_host,
    db: config.redis_db,
    password: config.redis_password
});

client.on('error', err => {
    if (err) {
        logger('default').error('connect to redis error, check your redis config', err);
        process.exit(1);
    }
})

export default client;