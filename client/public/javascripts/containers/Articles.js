import PreviewPage from "../view/preview";
import { connect } from 'react-redux';
import { getInfoFromCookies, getCookie } from '../utils/clienttools';

const mapStateToProps = (state) => {
    const { items } = state.previews.mainpreview;
    // console.log({items, state})
    let articleinfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node')));
    let authorid = articleinfo.length >= 2 ? articleinfo[0] : 0
    let { articles = [] } = items;
    return {
        articles: articles,
        articleNumber: 0,
        hasLoadAll: false,
        authorid
    }
}

export default connect(mapStateToProps)(PreviewPage);