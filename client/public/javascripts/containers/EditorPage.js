import EditorPage from '../view/editor';
import { connect } from 'react-redux';
import * as articleActions from '../modules/article';
import * as titlesActions from '../modules/titles';
import { getCookie, getInfoFromCookies } from '../utils/clienttools';

const mapStateToProps = (state, ownProps) => {
    const { article, images, titles } = state;
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
        { title, maintext } = article.editData || {},
        titlesResult = titles.loadData || []
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
        let action;
        switch (prefix) {
            case 'article':
                action = articleActions
                break;
            case 'titles':
                action = titlesActions
                break;
            default:
                break;
        }
        return dispatch(action[method](data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);