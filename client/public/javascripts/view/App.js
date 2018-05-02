import React, { Component } from 'react';
import { store } from '../store/main';
import { Route, Switch } from 'react-router-dom'
import TitlePanel from './titlepanel'
import SignPanel from './signpanel'
import Editor from './editor'
import ArticlePage from './articlepage'
import SigninPanel from './signinpanel'
import './css/App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: []
    };
    // this.getData();
  }

  componentDidMount() {
    console.log('App mounted');
  }

  componentWillUnmount() {
    console.log('App unmouted');
  }

  getData() {
    var self = this;
    store.getAllData(function (data) {
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


  render() {
    // var self = this;
    // var messages = this.state.messageList;
    // var arr = [];

    // messages
    //   .forEach(function (em) {
    //     arr.push(<li key={em}> {em} </li>);
    //   });
    return (
      <div className="col">
        <TitlePanel />
        <main>
          <Switch>
            <Route exact path="/" />
            <Route path="/signup" component={SignPanel} />
            <Route path="/article" component={ArticlePage} />
            <Route path="/editor" component={Editor} />
            <Route path="/signin" component={SigninPanel} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App;