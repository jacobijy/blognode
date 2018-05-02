import React, { Component } from 'react';
import PropTypes from "prop-types";
import "./css/article.css";

export default class ArticlePanel extends Component {
  static PropTypes = {
    article: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="article">
        <h1 className="article-title">
        </h1>
        <img className="article-image">
        </img>
        <p className="article-summery">
        </p>
      </div>
    )
  }
}