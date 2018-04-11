import React, { Component } from 'react';
import { render } from 'react-dom';
import titlePanel from "../titlepanel";
var store = require('../../store/main');
require('./App.css')

class MainContainer extends Component {
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

export default MainContainer;