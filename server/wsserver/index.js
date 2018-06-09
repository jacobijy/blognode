/*
 * @Author: Jacobi
 * @Date: 2018-05-31 01:46:48
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-09 12:47:31
 */
import socket_io from 'socket.io';
import { EventEmitter } from 'events';
import SioSocket from './siosocket';
import logger from '../../utils/logger';

let curId = 1;

export default class SocketServer extends EventEmitter {
    constructor(server) {
        super(server)
        this.server = server;
    }

    start() {
        let opts,
            self = this;
        if (!!this.opts) {
            opts = this.opts;
        }
        else {
            opts = {
                transports: [
                    'websocket', 'polling-xhr', 'polling-jsonp', 'polling'
                ]
            };
        }

        let sio = socket_io(this.server, opts);
        sio.use((socket, next) => {
            logger('default').debug('connenction established', socket.id);
            next();
        })
        sio.on('connection', socket => {
            let siosocket = new SioSocket(curId++, socket);
            self.emit('connection', siosocket);
            siosocket.on('closing', reason => {
                siosocket.send({ route: 'onKick', reason });
            });
        })
    }
}

// export default socketconn