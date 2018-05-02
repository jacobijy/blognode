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
    let articles = this.state.articles
    for (const article of articles) {
      if (!article.title)
        Object.assign(article, { title: article.maintext.slice(3, 8) })
    }
    return (
      <div className="row">
        <div className="col-sm-8 offset-sm-2">
          <div className="row">
            {
              articles.map((article, index) => (
                <SinglePanel
                  key={index}
                  article={article.maintext}
                  image={article.figure[0]}
                  title={article.title}
                />
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}