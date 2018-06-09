import article from './article';
import images from './images';
import titles from './titles';
import articles from './articles';
import auth from './auth';
import urlimage from './urlimage';
import comment from './comment';
import modulesConfig from './modules.json';
import { combineReducers } from 'redux';

export default combineReducers({
    article,
    auth,
    images,
    titles,
    articles,
    urlimage,
    comment
})

export function initialState() {
    const modules = modulesConfig.modules;
    const state = {};
    const defaultState = {
        loading: false,
        loaded: false,
        loadData: {},
        loadError: null
    }
    modules.map(module => {
        Object.assign(state, {[module]: Object.assign({}, defaultState)});
    })
    return state;
}