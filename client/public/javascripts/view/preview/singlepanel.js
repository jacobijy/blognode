import React, { Component } from 'react';
import PropTypes from "prop-types";
import "../css/article.css";

export default class SinglePanel extends Component {
  static PropTypes = {
    article: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { article, image, title } = this.props
    return (
      <div className="col-sm-4 offset-sm-2 singlepanel">
        <h1 className="article-title">
          {title}
        </h1>
        <img className="article-image" src={image} />
        <p className="article-summery">
          {
            article.length > 50 ? article.slice(0, 50) : article
          }
        </p>
      </div>
    )
  }
}