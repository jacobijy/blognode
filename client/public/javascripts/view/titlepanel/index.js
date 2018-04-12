import React, { Component } from "react";
import { render } from "react-dom";
import logo from "../../../images/logo.svg"
import "./titlepanel.css";

export default class TitlePanel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('titlepanel mounted');
  }

  componentWillUnmount() {
    console.log('titlepanel unmouted');
  }

  render() {
    return (
      <div id="title-header">
        <div id="title-name">
        </div>
        <div>
          <ul id="title-navbar">
            <li class="menu-item"><a class="active" href="#home">主页</a></li>
            <li class="dropdown"><a class="dropbtn" href="#share">技术分享</a>
              <div class="dropdown-content">
                <a href="/signup">注册</a>
                <a href="#">链接 2</a>
                <a href="#">链接 3</a>
              </div>
            </li>
            <li class="menu-item"><a href="#note">随记</a></li>
            <li class="menu-item"><a href="#archive">归档</a></li>
            <li class="menu-item"><a href="#linkx">友情链接</a></li>
            <li class="menu-item"><a href="#about">关于我</a></li>
          </ul>
        </div>
      </div>
    )
  }
}
