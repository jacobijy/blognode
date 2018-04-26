import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TitlePanel from '../titlepanel'
import MainContainer from '../App'
import SignPanel from '../signpanel'
import ArticleEditor from '../articleeditor'
import ArticlePage from '../articlepage'
import SigninPanel from '../signinpanel'
import {Store, createProvider} from 'react-redux'

class MainRouter extends Component {
  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={MainContainer} />
          <Route path='/signup' component={SignPanel} />
          <Route path='/article' component={ArticlePage} />
          <Route path='/editor' component={ArticleEditor} />
          <Route path='/signin' component={SigninPanel} />
        </Switch>
      </main>
    )
  }
}

class App extends Component {
  render () {
    return (
      <div>
        <TitlePanel />
        <MainRouter />
      </div>
    )
  }
}

render(<Router><App cookie = {document.cookie}/></Router>, document.getElementById('main-container'))
