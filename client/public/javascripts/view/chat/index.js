import React, { Component } from 'react';
import { config } from "../../../../../config";
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.Socket = null;
    }

    componentDidMount() {
        this.connectSocketServer()
    }

    componentWillUnmount() {
        this.Socket.disconnect()
    }

    connectSocketServer() {
        const Socket = io(`http://${config.host}:3000`)
        this.Socket = Socket;
        Socket.on('connect', (...args) => {
            console.log(args);
            console.log('test');
        })

        Socket.on('disconnect', ()=> {

        })

        Socket.on('')
    }

    sendMsg = () => {
        this.Socket.emit('test', this.input.value)
    }

    render() {
        return (
            <div>
                <input ref={ref => this.input = ref} />
                <button onClick={this.sendMsg} />
                <Link to='/'>main</Link>
            </div>
        )
    }
}