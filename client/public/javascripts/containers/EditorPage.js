import EditorPage from "../view/editor";
import { EditorNew, EditorOnOpen, EditorChangeTitle, EditorSelectArticle } from '../actions';
import { connect } from 'react-redux';
import { getInfoFromCookies, getCookie } from '../utils/clienttools';

const mapStateToProps = (state, ownProps) => {
    const { editorOnOpen, editorChangeTitle } = state.editor;
    // article_id
    // files
    // article
    // author_id
    // author_name
    // dispatch
    // titles
    console.log('state to props on open');
    let { err } = editorOnOpen.items,
        articleinfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node'))),
        author_id = articleinfo.length >= 2 ? articleinfo[0] : 0,
        author_name = articleinfo.length >= 2 ? articleinfo[1] : '',
        article_id = parseInt(getCookie('ARTICLE_EDIT')),
        { article = "<p><br></p>", files = [], titles = [] } = editorOnOpen.items,
        title = editorChangeTitle.title.length > 0 ? editorChangeTitle.title : titles.length > 0 ? titles[0].title : ''
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onOpenEditor: (data) => { dispatch(EditorOnOpen('post', data)); console.log('dispatch on open', data); },
        createNewArticle: () => {
            let articleinfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node')));
            let author_id = articleinfo.length >= 2 ? articleinfo[0] : 0
            dispatch(EditorNew('post', { author_id }))
        },
        onChangeTitle: (title) => {
            dispatch(EditorChangeTitle(title))
        },
        onSelectArticle: (article) => {
            dispatch(EditorSelectArticle(article))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);