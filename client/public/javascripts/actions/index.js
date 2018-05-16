import ApiClient from '../../../../utils/apiClient';
import { ArticleMainPageOption } from './articleActions';
import { UserSigninOption, UserSignupOption } from './signActions';
import { EditorNewEditorOption } from './editorActions';

const RequestAction = (action, json) => (method, path = '') => dispatch => {
    dispatch(action.Request(json))
    const request = new ApiClient();
    let promise = request[method](path, { data: json })
    promise.then((result) => {
        return result.err ? dispatch(action.Failure(result)) : dispatch(action.Success(result))
    }).catch((err) => {
        console.error('err', err);
    });
}

const UserSignup = (method, json) => dispatch => {
    return RequestAction(UserSignupOption, json)(method, '/signup')(dispatch)
}

const UserSignin = (method, json) => dispatch => {
    return RequestAction(UserSigninOption, json)(method, '/signin')(dispatch)
}

const ArticlesMainPage = (method, json) => dispatch => {
    return RequestAction(ArticleMainPageOption, json)(method, '/articles')(dispatch);
}

const EditorNew = (method, json) => dispatch => {
    return RequestAction(EditorNewEditorOption, json)(method, '/newArticle')(dispatch);
}

export { UserSignup, UserSignin, ArticlesMainPage, EditorNew }