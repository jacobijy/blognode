import { join } from 'path';

export const config = {
  port: 3000,
  host: '192.168.137.100',
  mongodb_conf: 'mongodb://localhost:27017/blog',
  debug: true,
  log_dir: join(__dirname, 'logs'),
  apiPort: 3000,
  apiHost: '192.168.137.100',
  tmpFileDir: join(__dirname, 'client/public/images/tmp/')
};