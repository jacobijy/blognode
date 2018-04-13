import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import TitlePanel from "../titlepanel";
import MainContainer from "../App";
import SignPanel from "../signpanel";

class MainRouter extends Component {
  render() {
    return (
      <Router forceRefresh={false}>
        <Switch>
          <Route exact path="/" component={MainContainer} />
          <Route path="/signup" component={SignPanel} />
        </Switch>
      </Router>
    )
  }
}

render(<TitlePanel />, document.getElementById("title-panel"));
render(<MainRouter />, document.getElementById("main-container"));