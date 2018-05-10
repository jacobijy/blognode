import React, { Component } from "react";
import '../css/iconfont.css'

export default class EditorToolBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm-12 toolsbg">
        <ul className="icon_lists clear tools">
          <li><i className="icon iconfont icon-746bianjiqi_biaoqing" /></li>
          <li><i className="icon iconfont icon-bold" /></li>
          <li><i className="icon iconfont icon-image" /></li>
          <li><i className="icon iconfont icon-insert_tag_field" /></li>
          <li><i className="icon iconfont icon-italic" /></li>
          <li><i className="icon iconfont icon-underline" /></li>
          <li><i className="icon iconfont icon-bianjiqiyinyong" /></li>
        </ul>
      </div >
    )
  }
}