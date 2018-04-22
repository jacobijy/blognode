import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import TitlePanel from "../titlepanel";
import MainContainer from "../App";
import SignPanel from "../signpanel";
import ArticleEditor from "../articleeditor";
import ArticlePage from "../articlepage"

class MainRouter extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={MainContainer} />
          <Route path='/signup' component={SignPanel} />
          <Route path='/article' component={ArticlePage} />
          <Route path='/editor' component={ArticleEditor} />
        </Switch>
      </main>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <TitlePanel />
        <MainRouter />
      </div>
    )
  }
}

render(<Router><App /></Router>, document.getElementById("main-container"));