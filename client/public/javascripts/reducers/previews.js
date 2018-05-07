import * as ACTIONS from '../actions';

const mainpreview = (
  state = {
    isRequesting: false,
    isInvalid: false,
    items: {}
  }, action) => {
  switch (action.type) {
    case ACTIONS.Articles_Main_Page_Request:
      return {
        ...state,
        isRequesting: true
      }
    case ACTIONS.Articles_Main_Page_FAILURE:
      return {
        ...state,
        isRequesting: false,
        isInvalid: true,
        items: action.result
      }

    case ACTIONS.Articles_Main_Page_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        isInvalid: false,
        items: action.articles
      }

    default:
      return state
  }
}

export { mainpreview }