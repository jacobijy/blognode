import React, { Component } from "react";
import { render } from "react-dom";

export default class ArticlePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : "",
      images : [],
      maintext : ""
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <div>
          <image src ={this.state.images[0]}></image>
          <p>{this.state.maintext}</p>
        </div>
      </div>
    )
  }
}