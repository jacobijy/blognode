import EditorPage from '../view/editor';
import { connect } from 'react-redux';
import * as modules from '../modules';
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
        article_id = parseInt(getCookie('ARTICLE_EDIT')),
        titleResult = titles.loadData.titles || [],
        { maintext = "<p><br></p>", title } = article.loadData || {},
        { edited, editing } = article.editData || {},
        { addedImages } = images.editData || {}
    return {
        author_id,
        author_name,
        title,
        maintext,
        article_id,
        addedImages,
        edited,
        editing,
        titles: titleResult
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    requestAction: (method, prefix, data) => (dispatch(modules[prefix][method](data)))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);