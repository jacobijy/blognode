import React, { Component } from "react";
import SinglePanel from "./singlepanel";
import Request from "superagent";
import { getInfoFromCookies } from "../../../../../utils/clienttools";

export default class PreviewPage extends Component {
  constructor(props) {
    super(props);
    let articleinfo = getInfoFromCookies(decodeURIComponent(document.cookie));
    this.author_id = articleinfo[1];
    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    Request
      .post('/get_articles')
      .send({ author_id: this.author_id })
      .end((err, res) => {
        if (err) console.log(err);
        this.setState({
          articles: JSON.parse(res.text)
        })
      })
  }

  render() {
    console.log(this.state.articles)
    return (
      <div className="row">
        <div className="col-auto"></div>
        <div className="col-9">
          {
            this.state.articles.map((article, index) => (
              <SinglePanel
                article={article.maintext}
                image={article.figure[0]}
                title={article.title}
              />
            ))
          }
        </div>
        <div className="col-auto"></div>
      </div>
    )
  }
}