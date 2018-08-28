import EditorPage from '../view/editor';
import { connect } from 'react-redux';
import * as modules from '../modules';
import { getCookie, getInfoFromCookies } from '../utils/clienttools';
import { ICommonState } from '../../../utils/createCRUD';

const mapStateToProps = (state: { [key: string]: ICommonState }) => {
    const { article, images, titles } = state;
    // article_id
    // files
    // article
    // author_id
    // author_name
    // dispatch
    // titles
    let author_info = getInfoFromCookies(decodeURIComponent(getCookie('blog_node')));
    let author_id = author_info[0];
    let author_name = author_info[1];
    let article_id = parseInt(getCookie('ARTICLE_EDIT'), 10);
    let titleResult = titles.loadData.titles || [];
    let { maintext = '<p><br></p>', title } = article.loadData || {};
    let { edited, editing } = article.editData || {};
    let { addedImages } = images.editData || {};
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
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    requestAction: (method, prefix, data) => (dispatch(modules[prefix][method](data)))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
