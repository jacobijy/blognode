/*
 * @Author: Jacobi
 * @Date: 2018-05-31 01:46:48
 * @Last Modified by: Jacobi
 * @Last Modified time: 2018-05-31 01:57:42
 */
import socket_io from 'socket.io';
import { EventEmitter } from 'events';
import SioSocket from './siosocket';

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

        let sio = socket_io(this.server);
        console.log(this.server, opts);
        sio.on('connection', socket => {
            console.log('connenction established');
            let siosocket = new SioSocket(curId++, socket);
            self.emit('connection', siosocket);
            siosocket.on('closing', reason => {
                siosocket.send({ route: 'onKick', reason: reason });
            });
        })
    }
}

// export default socketconn