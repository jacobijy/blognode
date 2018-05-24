import redis from 'redis';
import { config } from '../../config';

const client = redis.createClient(config.redis_port, config.redis_host);

export default client;