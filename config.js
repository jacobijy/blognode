import { join } from 'path';

export const config = {
  port: 3000,
  host: '192.168.137.78',
  mongodb_conf: 'mongodb://localhost:27017/blog',
  debug: true,
  log_dir: join(__dirname, 'logs'),
  apiPort: 3000,
  apiHost: '172.26.164.243',
  tmpFileDir: join(__dirname, 'client/public/images/tmp/')
};