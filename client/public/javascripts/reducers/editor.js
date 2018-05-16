import * as Actions from '../actions/editorActions';

const editorOnOpen = (
    state = {
        isRequesting: false,
        items: {}
    }, action) => {
        switch (action.type) {
            case Actions.Editor_On_Open_Request:
                return {
                    ...state,
                    isRequesting: true
                }
            case Actions.Editor_On_Open_Failure:
                return {
                    ...state,
                    isRequesting: false
                }
            case Actions.Editor_On_Open_Success:
                return {
                    ...state,
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

export { editorNew, editorOnOpen }