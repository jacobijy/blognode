import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SocketClient from './socketConnector';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.Socket = new SocketClient();
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.Socket.disconnect()
    }

    connectSocketServer() {
        const Socket = this.Socket
        Socket.on('connect', (...args) => {
            console.log(args);
            console.log('test');
        })

        Socket.on('disconnect', ()=> {

        })

        Socket.on('')
    }

    sendMsg = () => {
        // this.Socket.emit('test', this.input.value)
        this.Socket.sendData('chat', 'single', this.input.value)
    }

    render() {
        return (
            <div>
                <input ref={ref => this.input = ref} />
                <button onClick={this.sendMsg} >Send</button>
                <Link to='/'>main</Link>
            </div>
        )
    }
}