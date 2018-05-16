import EditorPage from "../view/editor";
import { EditorNew, EditorOnOpen } from '../actions';
import { connect } from 'react-redux';
import { getInfoFromCookies, getCookie } from '../utils/clienttools';

const mapStateToProps = (state, ownProps) => {
    // console.log(state, ownProps);
    const { editorNew, editorOnOpen } = state;
    // article_id
    // files
    // article
    // author_id
    // author_name
    // dispatch
    // titles
    let articleinfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node')));
    let author_id = articleinfo.length >= 2 ? articleinfo[0] : 0
    let author_name = articleinfo.length >= 2 ? articleinfo[1] : ''
    let article_id = parseInt(getCookie('ARTICLE_EDIT')) || 0
    let { article = "<p><br></p>", files = [] } = editorNew.items
    let { titles = [] } = editorOnOpen.items
    article = editorNew.items.article || article
    console.log({
        author_id,
        article_id,
        author_name,
        article,
        files,
        titles
    });
    return {
        author_id,
        article_id,
        author_name,
        article,
        files,
        titles
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onOpenEditor: (data) => { dispatch(EditorOnOpen('post', data)) },
    createNewArticle: () => { dispatch(EditorNew('post')) }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);