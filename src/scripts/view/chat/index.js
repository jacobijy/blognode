import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SocketClient from './socketConnector';
import '../css/chat.css';
import { getInfoFromCookies, getCookie } from '../../utils/clienttools';

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

    sendMsg = () => {
        // this.Socket.emit('test', this.input.value)
        this.Socket.sendData('chat', 'single', this.input.value);
    }

    render() {
        const { messages = [] } = this.props;
        const user_id = getInfoFromCookies(getCookie('blog_node'))[0]
        return (
            <div className="col-sm-8 offset-sm-2">
                <div className="chat-board">
                    {
                        messages.map(message => {
                            <p className={`${message.user_id === user_id ? 'chat-msg-self' : 'chat-msg-other'}`}>{message.text}</p>
                        })
                    }
                </div>
                <input ref={ref => this.input = ref} />
                <button onClick={this.sendMsg} >Send</button>
                <Link to='/'>main</Link>
            </div>
        )
    }
}