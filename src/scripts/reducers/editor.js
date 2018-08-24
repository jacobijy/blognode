import * as Actions from '../actions/editorActions';
import { combineReducers } from 'redux';

const editorOpenArticle = (
    state = {
        isRequesting: false,
        items: {}
    }, action) => {
    switch (action.type) {
        case Actions.Editor_Open_Article_Request:
            return {
                ...state,
                isRequesting: true
            }
        case Actions.Editor_Open_Article_Failure:
            return {
                ...state,
                isRequesting: false,
                items: action.data
            }
        case Actions.Editor_Open_Article_Success:
            return {
                ...state,
                items: action.data
            }
        default:
            return state
    }
}

const editorOpenTitles = (
    state = {
        items: {}
    }, action
) => {
    switch (action.type) {
        case Actions.Editor_Open_Titles_Request:
            return {
                ...state,
                isRequesting: true
            }
        case Actions.Editor_Open_Titles_Failure:
            return {
                ...state,
                isRequesting: false,
                items: action.data
            }
        case Actions.Editor_Open_Titles_Success:
            return {
                ...state,
                items: action.data
            }
        default:
            return state
    }
}


const editorOnSave = (
    state = {
        saving: false,
        saved: true,
        items: {}
    }, action
) => {
    switch (action.type) {
        case Actions.Editor_On_Save_Request:
            return {
                ...state,
                saving: true,
                saved: false
            }
        case Actions.Editor_On_Save_Failure:
            return {
                ...state,
                saving: false,
                saved: false,
                items: action.data
            }
        case Actions.Editor_On_Save_Success:
            return {
                ...state,
                saving: false,
                saved: true,
                items: action.data
            }
        default:
            return state
    }
}

const editorNew = (
    state = {
        isRequesting: false,
        items: {}
    }, action) => {
    switch (action.type) {
        case Actions.Editor_New_Article_Request:
            return {
                ...state,
                isRequesting: true
            }

        case Actions.Editor_New_Article_Success:
            return {
                ...state,
                isRequesting: false,
                items: action.data
            }

        default:
            return state;
    }
}

const editorChangeTitle = (
    state = {
        title: ''
    },
    action) => {
    switch (action.type) {
        case Actions.Editor_Change_Title:
            return {
                ...state,
                title: action.title
            }
        default:
            return state
    }
}

export default combineReducers({ editorNew, editorOpenArticle, editorChangeTitle, editorOpenTitles, editorOnSave })