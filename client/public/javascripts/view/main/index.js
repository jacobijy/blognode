import React, { Component } from 'react';
import { render } from 'react-dom';
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

  componentDidMount() {
    console.log('maincontainer mounted');
  }

  componentWillUnmount() {
    console.log('maincontainer unmouted');
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