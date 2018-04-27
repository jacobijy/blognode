import React, { Component } from 'react';
import "./css/article.css";

export default class ArticlePanel extends Component {
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