import modules from '../modules';
import { getInfoFromCookies, getCookie } from '../utils/clienttools';
import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';
import { ICombineActions } from '../../../utils/createCRUD';

type ExtraMiddlewareAPI<D extends Dispatch<ICombineActions> = Dispatch<AnyAction>, S = any> = MiddlewareAPI<D, S>;
const createMiddleware = (nextAction) => {
    return ({ dispatch, getState } : ExtraMiddlewareAPI) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }

        next(action);
        let userInfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node')));
        let author_id = userInfo.length >= 2 ? userInfo[0] : 0;
        let article_id = getCookie('ARTICLE_EDIT');
        if (action.type === 'article-editor/UPDATE_SUCCESS' || action.type === 'article-editor/CREATE_SUCCESS') {
            dispatch(modules.titles.load({ params: { author_id } }));
            dispatch(modules.article.load( { params: { article_id }}));
        }
    };
};

export default createMiddleware;
