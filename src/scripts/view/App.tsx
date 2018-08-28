import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './navbar';
import SignupPage from '../containers/SignupPage';
import Editor from '../containers/EditorPage';
import ArticlePage from '../containers/ArticlePage';
import SigninPage from '../containers/SigninPage';
import ArticlePanel from '../containers/Articles';
// import Search from '../../javascripts/view/search';
// import Chat from './chat';
import './css/App.css';

class App extends Component {

    renderNext() {
        return (
            <div>
                <NavBar />
                <div className='fill-left'>
                    <Switch>
                        <Route exact path='/' component={ArticlePanel} />
                        <Route path='/signup' component={SignupPage} />
                        <Route path='/signin' component={SigninPage} />
                    </Switch>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Router>
                <div className='fill-container'>
                    <Switch>
                        <Route path='/editor' component={Editor} />
                        {/* <Route path='/search' component={Search} /> */}
                        <Route path='/p/:article_id' component={ArticlePage} />
                        {/* <Route path='/chat' component={Chat} /> */}
                        <Route path='/' component={this.renderNext} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
