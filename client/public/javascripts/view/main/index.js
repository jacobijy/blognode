import React, { Component } from 'react';
import ReactDOM from 'react-dom';
var store = require('../../store/main');
import logo from './logo.svg';
require('../../../css/App.css')

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: []
    };
    this.getData();
  }

  render() {
    // var self = this;
    // var messages = this.state.messageList;
    // var arr = [];

    // messages
    //   .forEach(function (em) {
    //     arr.push(<li key={em}> {em} </li>);
    //   });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button className="App-login">
          Login
        </button>
      </div>
    );
  }

  getData() {
    var self = this;
    store
      .getAllData(function (data) {
        var i = 0;
        var len = data.length;
        var messageListArr = [];
        for (; i < len; i++) {
          messageListArr[i] = data[i].Message;
        }
        self.setState({ messageList: messageListArr });
        console.log(self.state.messageList);
      })
  }
}

ReactDOM.render(
  <MessageList />,
  document.getElementById('main-container')
);