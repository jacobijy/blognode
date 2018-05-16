import EditorPage from "../view/editor";
import { EditorNew, EditorOnOpen, EditorChangeTitle } from '../actions';
import { connect } from 'react-redux';
import { getInfoFromCookies, getCookie } from '../utils/clienttools';

const mapStateToProps = (state, ownProps) => {
    const { editorNew, editorOnOpen, editorChangeTitle } = state;
    // article_id
    // files
    // article
    // author_id
    // author_name
    // dispatch
    // titles
    let { err } = editorOnOpen.items
    let articleinfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node')));
    let author_id = articleinfo.length >= 2 ? articleinfo[0] : 0
    let author_name = articleinfo.length >= 2 ? articleinfo[1] : ''
    let article_id = parseInt(getCookie('ARTICLE_EDIT')) || 0
    let { article = "<p><br></p>", files = [] } = editorNew.items
    let { titles = [] } = editorOnOpen.items
    let title = editorChangeTitle.title || ''
    article = editorNew.items.article || article
    return Object.assign({}, {
        author_id,
        article_id,
        author_name,
        article,
        files,
        titles,
        title
    }, err ? { err } : {})
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onOpenEditor: (data) => { dispatch(EditorOnOpen('post', data)) },
    createNewArticle: () => {
        let articleinfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node')));
        let author_id = articleinfo.length >= 2 ? articleinfo[0] : 0
        dispatch(EditorNew('post', { author_id }))
    },
    onChangeTitle: (event) => {
        dispatch(EditorChangeTitle(event.target.value))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);