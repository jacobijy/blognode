import React, { Component } from "react";
import { render } from "react-dom";
import logo from "../../../images/logo.svg"
import "./titlepanel.css";

export default class TitlePanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='Title-header'>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Title-navbar">
          <ul className="site-menu">
            <li className="menu-item"><a href="/">首页</a></li>
            <li className="menu-item"><a href="">技术分享</a></li>
            <li className="menu-item"><a href="">随记</a></li>
            <li className="menu-item"><a href="">归档</a></li>
            <li className="menu-item"><a href="">友情链接</a></li>
            <li className="menu-item"><a href="">关于我</a></li>
          </ul>
        </div>
      </div>
    )
  }
}
