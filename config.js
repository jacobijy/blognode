import path from 'path';

export const config = {
	port : 3001,
	host : '192.168.137.78',
	mongodb_conf : 'mongodb://localhost:27017/blog',
	debug: true,
	log_dir: path.join(__dirname, 'logs'),
	apiPort : 3001,
	apiHost : '192.168.137.78'
};