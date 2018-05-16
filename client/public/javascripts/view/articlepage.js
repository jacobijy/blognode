import React, { Component } from "react";
import Request from "superagent";

export default class ArticlePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      images: [],
      maintext: ""
    }
  }

  UNSAFE_componentWillMount() {
    Request
      .post('/get_articles')
      .end((err, result) => {
        if (err) return err;
        if (result && result.length > 0) {
          this.setState({
            articles: result
          })
        }
      })
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <div>
          <image src={this.state.images[0]}></image>
          <p>{this.state.maintext}</p>
        </div>
      </div>
    )
  }
}