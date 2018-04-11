import React, { Component } from "react";
import { render } from "react-dom";
import logo from "../../../images/logo.svg"

export default class TitlePanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='App-header'>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </div>
    )
  }
}
