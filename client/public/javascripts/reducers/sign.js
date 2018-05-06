import * as ACTIONS from '../actions';

const signup = (
  state = {
    isSigning: false,
    isInvalid: false,
    items: {}
  }, action) => {
  switch (action.type) {
    case ACTIONS.USER_SIGNUP_REQUEST:
      return {
        ...state,
        isSigning: true
      }
    case ACTIONS.USER_SIGNUP_FAILURE:
      return {
        ...state,
        isSigning: false,
        isInvalid: true,
        items: action.result
      }

    case ACTIONS.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isSigning: false,
        isInvalid: false,
        items: action.result
      }

    default:
      return state
  }
}

const signin = (
  state = {
    isSigning: false,
    isInvalid: false,
    items: {}
  }, action) => {
  console.log(action)
  switch (action.type) {
    case ACTIONS.USER_SIGNIN_REQUEST:
      return {
        ...state,
        isSigning: true
      }
    case ACTIONS.USER_SIGNIN_FAILURE:
      return {
        ...state,
        isSigning: false,
        isInvalid: true,
        items: action.result
      }

    case ACTIONS.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        isSigning: false,
        isInvalid: false,
        items: action.result
      }

    default:
      return state
  }
}

export { signin, signup };