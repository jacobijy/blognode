import EditorPage from "../view/editor";
import AsyncRequests, { EditorChangeTitle } from '../actions';
import { connect } from 'react-redux';
import { getInfoFromCookies, getCookie } from '../utils/clienttools';

const mapStateToProps = (state, ownProps) => {
    const { editorOpenArticle, editorOpenTitles, editorOnSave } = state.editor;
    // article_id
    // files
    // article
    // author_id
    // author_name
    // dispatch
    // titles
    let { err, article = "<p><br></p>", files = [], title } = editorOpenArticle.items,
        articleinfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node'))),
        author_id = articleinfo.length >= 2 ? articleinfo[0] : 0,
        author_name = articleinfo.length >= 2 ? articleinfo[1] : '',
        article_id = parseInt(getCookie('ARTICLE_EDIT')),
        { titles = [] } = editorOpenTitles.items,
        { saving, saved } = editorOnSave
    return Object.assign({}, {
        author_id,
        article_id,
        author_name,
        article,
        files,
        saving,
        saved,
        titles,
        title
    }, err ? { err } : {})
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onOpenArticle: data => { dispatch(AsyncRequests('editor', 'post', data)) },
        createNewArticle: () => {
            let userInfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node')));
            let author_id = userInfo.length >= 2 ? userInfo[0] : 0
            dispatch(AsyncRequests('newArticle', 'post', { author_id }))
        },
        onChangeTitle: (title) => { dispatch(EditorChangeTitle(title)) },
        onOpenTitles: data => { dispatch(AsyncRequests('titles', 'post', data)) },
        onSaveArticle: data => { dispatch(AsyncRequests('saveArticle', 'post', data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);