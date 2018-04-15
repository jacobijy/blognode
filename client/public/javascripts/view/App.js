import React, { Component } from 'react';
import { render } from 'react-dom';
import store from '../store/main';
import './css/App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: []
    };
    this.getData();
  }

  componentDidMount() {
    console.log('App mounted');
  }

  componentWillUnmount() {
    console.log('App unmouted');
  }

  render() {
    // var self = this;
    // var messages = this.state.messageList;
    // var arr = [];

    // messages
    //   .forEach(function (em) {
    //     arr.push(<li key={em}> {em} </li>);
    //   });
    var self = this;
    console.log(this.props.children);
    return (
      <div>
        {self.props.children}
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

export default App;