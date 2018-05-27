import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TitlePanel from './titlepanel'
import SignupPage from '../containers/SignupPage'
import Editor from '../containers/EditorPage'
import ArticlePage from '../containers/ArticlePage'
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

    renderNext() {
        return (
            <div>
                <TitlePanel />
                <div className="fill-left">
                    <Switch>
                        <Route exact path="/" component={ArticlePanel} />
                        <Route path="/signup" component={SignupPage} />
                        <Route path="/signin" component={SigninPage} />
                    </Switch>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Router>
                <div className="fill-container">
                    <Switch>
                        <Route path="/editor" component={Editor} />
                        <Route path="/p/:article_id" component={ArticlePage}/>
                        <Route path="/" component={this.renderNext} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;