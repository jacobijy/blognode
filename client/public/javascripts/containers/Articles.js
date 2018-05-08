import PreviewPage from "../view/preview";
import { connect } from 'react-redux';
import { getInfoFromCookies } from '../../../../utils/clienttools';

const mapStateToProps = (state) => {
  const { items } = state.mainpreview;
  // console.log({items, state})
  let articleinfo = getInfoFromCookies(decodeURIComponent(document.cookie));
  let authorid = articleinfo.length >= 2 ? articleinfo[1] : 0
  let articles = items !== undefined&&items.articles ? items.articles : []
  console.log(items);
  console.log(articles);
  return {
    articles: articles,
    articleNumber: 0,
    hasLoadAll: false,
    authorid
  }
}

export default connect(mapStateToProps)(PreviewPage);