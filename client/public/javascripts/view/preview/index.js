import React, { Component } from "react";
import SinglePanel from "./singlepanel";
import { getInfoFromCookies } from "../../../../../utils/clienttools";
import { ArticlesMainPage } from '../../actions';
import PropTypes from 'prop-types';

export default class PreviewPage extends Component {
  static propTypes = {
    articles: PropTypes.array[PropTypes.object],
    articleNumber: PropTypes.number.isRequired,
    hasLoadAll: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    authorid: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    let articleinfo = getInfoFromCookies(decodeURIComponent(document.cookie));
    this.author_id = articleinfo[1];
  }

  componentDidMount() {
    const { articleNumber, dispatch, authorid } = this.props;
    ArticlesMainPage('post', { authorid, articleNumber })(dispatch);
  }

  renderSinglePanel(article, index) {
    console.log(article);
    const { maintext, figure, title } = article
    return (
      <SinglePanel
        key={index}
        article={maintext}
        image={figure[0]}
        title={title}
      />
    )
  }

  render() {
    let { articles } = this.props;
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
                this.renderSinglePanel(article, index)
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}