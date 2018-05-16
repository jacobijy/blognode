import EditorPage from "../view/editor";
import { EditorNew } from '../actions';
import { connect } from 'react-redux';
import { getInfoFromCookies, getCookie } from '../utils/clienttools';

const mapStateToProps = (state, ownProps) => {
    // console.log(state, ownProps);
    const { editorNew } = state;
    // article_id
    // files
    // article
    // author_id
    // author_name
    // dispatch
    let articleinfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node')));
    let author_id = articleinfo.length >= 2 ? articleinfo[1] : 0
    let author_name = articleinfo.length >= 2 ? articleinfo[0] : ''
    let article_id = parseInt(getCookie('ARTICLE_EDIT')) || 0
    let { article = "<p><br></p>", files = [] } = editorNew.items
    return {
        author_id,
        article_id,
        author_name,
        article,
        files
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log(dispatch, ownProps);
    return {
        createNewArticle: () => { dispatch(EditorNew('post')) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);