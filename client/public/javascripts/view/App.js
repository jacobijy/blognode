import React, { Component } from 'react';
import { store } from '../store/main';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TitlePanel from './titlepanel'
import SignupPage from '../containers/SignupPage'
import Editor from '../containers/EditorPage'
import ArticlePage from './articlepage'
import SigninPage from '../containers/SigninPage'
import ArticlePanel from "../containers/Articles";
import './css/App.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: []
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
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

    renderNext() {
        return (
            <div>
                <TitlePanel />
                <div className="fill-left">
                    <Switch>
                        <Route exact path="/" component={ArticlePanel} />
                        <Route path="/signup" component={SignupPage} />
                        <Route path="/article" component={ArticlePage} />
                        <Route path="/signin" component={SigninPage} />
                    </Switch>
                </div>
            </div>
        )
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
            <Router>
                <div className="fill-container">
                    <Switch>
                        <Route path="/editor" component={Editor} />
                        <Route path="/" component={this.renderNext} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;