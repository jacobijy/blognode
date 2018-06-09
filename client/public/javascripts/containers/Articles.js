import PreviewPage from "../view/preview";
import { connect } from 'react-redux';
import * as modules from '../modules';
import { getInfoFromCookies, getCookie } from '../utils/clienttools';

const mapStateToProps = (state) => {
    const { loadData = {} } = state.articles;
    // console.log({items, state})
    let { articles = [], articleNumber = 0 } = loadData,
        articleinfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node'))),
        author_id = articleinfo.length >= 2 ? articleinfo[0] : 0
    return {
        articles,
        articleNumber,
        author_id
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    requestAction: (method, prefix, data) => (dispatch(modules[prefix][method](data)))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewPage);