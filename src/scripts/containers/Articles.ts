import PreviewPage from '../view/preview';
import { connect } from 'react-redux';
import modules, { ModuleMethod } from '../modules';
import { getInfoFromCookies, getCookie } from '../utils/clienttools';
import { ICommonState } from '../../../utils/createCRUD';
import { Dispatch } from 'redux';

const mapStateToProps = (state: { [key: string]: ICommonState }) => {
    const { loadData = {} } = state.articles;
    // console.log({items, state})
    let { articles = [], articleNumber = 0 } = loadData;
    let articleinfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node')));
    let author_id = articleinfo.length >= 2 ? articleinfo[0] : '';
    return {
        articles,
        articleNumber,
        author_id
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    requestAction: (
        method: ModuleMethod,
        prefix: string,
        data: any
    ) => (dispatch(modules[prefix][method](data)))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewPage);
