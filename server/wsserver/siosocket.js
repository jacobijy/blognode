import { EventEmitter } from 'events';
import SocketIO from 'socket.io';

const ST_INITED = 0;
const ST_CLOSED = 1;

export default class SioSocket extends EventEmitter {
    id: number;
    socket: SocketIO.Socket;
    remoteAddress: { ip: string };
    state: number;

    constructor(id: number, socket: SocketIO.Socket) {
        super();
        this.id = id;
        this.socket = socket;
        this.remoteAddress = {
            ip: socket.handshake.address
        };
        this.registerListeners();
        // TODO: any other events?
    }

    registerListeners() {
        const self = this;
        let socket = this.socket;

        //disconnect
        socket.on('disconnect', this.emit.bind(this, 'disconnect'));

        //error
        socket.on('error', this.emit.bind(this, 'error'));

        //message
        socket.on('message', msg => {
            self.emit('message', msg);
        });

        //gameapi
        socket.on('gameapi', (...args) => {
            console.log(args);
        });

        this.state = ST_INITED;
    }

    send(msg: any) {
        if (this.state !== ST_INITED) {
            return;
        }
        if (typeof msg !== 'string') {
            msg = JSON.stringify(msg);
        }
        this.socket.send(msg);
    }
    sendRaw = this.send;
    disconnect() {
        if (this.state === ST_CLOSED) {
            return;
        }

        this.state = ST_CLOSED;
        this.socket.disconnect();
    }
}