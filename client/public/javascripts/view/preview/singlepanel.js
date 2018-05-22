import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
    const { article, image, title, article_id } = this.props
    let li_class = image ? 'have-img' : ''
    return (
      <li className={`singlepanel ${li_class}`}>
        <div className="content">
          <Link className="article-title" target="_blank" to={`/p/${article_id}`}>
            {title}
          </Link>
          <img className="article-image" src={image} />
          <p className="article-summery">
            {
              article.length > 50 ? article.slice(0, 50) : article
            }
          </p>
        </div>
      </li>
    )
  }
}