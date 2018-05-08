import * as ACTIONS from '../actions';

const mainpreview = (
  state = {
    isRequesting: false,
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
        items: action.data
      }

    case ACTIONS.Articles_Main_Page_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        items: action.data
      }

    default:
      return state
  }
}

export { mainpreview }