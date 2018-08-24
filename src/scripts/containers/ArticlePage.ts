import Article from '../view/article';
import { connect } from 'react-redux';
import modules, { ModuleMethod } from '../modules';
import { Dispatch, AnyAction } from 'redux';
import { ICommonState, ISpecificAction } from '../../../utils/createCRUD';

interface IState {
    article: ICommonState;
    comment: ICommonState;
}

const mapStateToProps = (state: IState) => {
    const { article, comment } = state;
    let { maintext = '', title = '', figure = [] } = article.loadData || {};
    let { comments = [] } = comment.loadData || {};
    return {
        maintext,
        title,
        figure,
        comments
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    requestAction: (
        method: ModuleMethod,
        prefix: string,
        data: ISpecificAction
    ) => (dispatch(modules[prefix][method](data)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
