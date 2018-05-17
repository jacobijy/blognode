import ApiClient from '../../../../utils/apiClient';
import { ArticleMainPageOption } from './articleActions';
import { UserSigninOption, UserSignupOption } from './signActions';
import * as editor from './editorActions';

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
    return RequestAction(editor.EditorNewEditorOption, json)(method, '/newArticle')(dispatch);
}

const EditorOnOpen = (method, json) => dispatch => {
    return RequestAction(editor.EditorOnOpenOption, json)(method, '/editor')(dispatch);
}

const EditorChangeTitle = title => dispatch => {
    return dispatch(editor.EditorChangeTitleAction(title))
}

const EditorSelectArticle = article => dispatch => {
    return dispatch(editor.EditorSelectArticleAction(article))
}

export { UserSignup, UserSignin, ArticlesMainPage, EditorNew, EditorOnOpen, EditorChangeTitle, EditorSelectArticle}