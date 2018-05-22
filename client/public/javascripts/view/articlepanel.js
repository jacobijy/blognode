import React, { Component } from "react";
import { getCookie } from '../utils/clienttools';

export default class ArticlePanel extends Component {
  constructor(props) {
    super(props);
    let article_id = getCookie('ARTICLE_EDIT')
    this.props.requestAction('load', 'article', { params: { article_id } })
  }

  render() {
    let { maintext, title, figure = [] } = this.props
    return (
      <div>
        <h1>{title}</h1>
        <div>
          {/* <image src={figure[0]}></image> */}
          <div dangerouslySetInnerHTML={{__html: maintext}}></div>
        </div>
      </div>
    )
  }
}