import React, { Component } from 'react';
import { config } from "../../../../config";
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

const conn = new WebSocket(`ws://${config.apiHost}:${config.apiPort}`)

export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.connectSocketServer()
    }

    connectSocketServer() {
        const Socket = io(`ws://${config.host}:3001`)
        Socket.on('connection', (...args) => {
            console.log(args);
            console.log('test');
        })
    }


    render() {
        return (
            <div>
                <Link to='/'>main</Link>
            </div>
        )
    }
}