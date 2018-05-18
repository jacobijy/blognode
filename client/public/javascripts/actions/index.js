import ApiClient from '../../../../utils/apiClient';
import { ArticleMainPageOption } from './articleActions';
import { UserSigninOption, UserSignupOption } from './signActions';
import * as editor from './editorActions';

const RequestAction = (action, json, callback?: Function) => (method, path = '') => dispatch => {
    dispatch(action.Request(json))
    const request = new ApiClient();
    let promise = request[method](path, { data: json })
    promise.then((result) => {
        if (callback) callback()
        return result.err ? dispatch(action.Failure(result)) : dispatch(action.Success(result))
    }).catch((err) => {
        console.error('err', err);
    });
}

const TypeToOption = {
    'signup': UserSignupOption,
    'signin': UserSigninOption,
    'articles': ArticleMainPageOption,
    'newArticle': editor.EditorNewEditorOption,
    'editor': editor.EditorOpenArticleOption,
    'titles': editor.EditorOpenTitlesOption,
    'saveArticle': editor.EditorOnSaveOption
}

const AsyncRequests = (type, method, json, callback?:Function) => dispatch => {
    let option = TypeToOption[type]
    return RequestAction(option, json, callback)(method, type)(dispatch)
}

export default AsyncRequests

const EditorChangeTitle = title => dispatch => {
    return dispatch(editor.EditorChangeTitleAction(title))
}

export { EditorChangeTitle }