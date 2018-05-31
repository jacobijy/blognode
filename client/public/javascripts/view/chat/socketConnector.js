import { config } from "../../../../../config";
import io from 'socket.io-client';
import { EventEmitter } from 'events';
import protocols from '../../../../../protocol';

export default class SocketClient extends EventEmitter {
    constructor() {
        super();
        this.init();
        this.Protocols = {};
    }

    init() {
        const Socket = io(`ws://${config.host}:${config.port}`)
        this.Socket = Socket;
        Socket.on('connection', (...args) => {
            console.log(args);
            console.log('test');
        })

        // Socket.on('group', (msg, name, id) => {
        //     console.log(msg, name, id);
        // })

        // Socket.on('single', (msg, name, id) => {
        //     console.log(msg, name, id);
        // })
    }

    getProtocolDown(module, action) {
        const json = `${module}_${action}_down`;
        return protocols[json]
    }


    getProtocolUp(module, action) {
        const json = `${module}_${action}_up`;
        return protocols[json]
    }

    sendData(module, action, data) {
        const method = this.getProtocolUp(module, action)
        this.Socket.emit(method.type, data)
    }

    recvData(module, action, data) {
        // const data = this.get
    }

    emit(event, ...args) {
        this.Socket.emit(event, ...args);
    }

    disconnect() {
        this.Socket.disconnect();
    }
}