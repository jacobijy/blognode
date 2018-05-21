import EditorPage from '../view/editor';
import { connect } from 'react-redux';
import * as modules from '../modules';
import { getCookie, getInfoFromCookies } from '../utils/clienttools';

const mapStateToProps = (state, ownProps) => {
    const { article, images, titles, auth } = state;
    // article_id
    // files
    // article
    // author_id
    // author_name
    // dispatch
    // titles
    let author_info = getInfoFromCookies(decodeURIComponent(getCookie('blog_node'))),
        author_id = author_info[0],
        author_name = author_info[1],
        article_id = getCookie('ARTICLE_EDIT'),
        titlesResult = titles.loadData || [],
        articleData = {}
    if (article.editData) {
        articleData = article.editData.article_id == article_id ? article.editData : article.loadData;
    }else if (article.loadData) {
        articleData = article.loadData
    }
    let { maintext, title } = articleData
    return {
        author_id,
        author_name,
        title,
        maintext,
        article_id,
        images,
        titles: titlesResult
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    requestAction: (method, prefix, data) => {
        return dispatch(modules[prefix][method](data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);