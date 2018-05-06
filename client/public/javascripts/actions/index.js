import ApiClient from '../../../../utils/apiClient';

export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST'
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE'

const UserSignupOption = {
  Request: (json) => ({
    type: USER_SIGNUP_REQUEST,
    result: json
  }),

  Failure: (err) => ({
    type: USER_SIGNUP_FAILURE,
    result: err
  }),

  Success: (json) => ({
    type: USER_SIGNUP_SUCCESS,
    result: json
  })
}

const UserSignRequest = (action, json) => (method, path = '') => (dispatch) => {
  dispatch(action.Request(json))
  const request = new ApiClient();
  let promise = request[method](path, { data: json })
  promise.then((result) => {
    return result.result ? dispatch(action.Success(result)) : dispatch(action.Failure(result))
  }).catch((err) => {
    console.log('err', err);
  });
}

export const UserSignup = json => dispatch => {
  return UserSignRequest(UserSignupOption, json)('post', '/signup')(dispatch)
}

export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST'
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS'
export const USER_SIGNIN_FAILURE = 'USER_SIGNIN_FAILURE'

const UserSigninOption = {
  Request: (json) => ({
    type: USER_SIGNIN_REQUEST,
    result: json
  }),

  Failure: (err) => ({
    type: USER_SIGNIN_FAILURE,
    result: err
  }),

  Success: (json) => ({
    type: USER_SIGNIN_SUCCESS,
    result: json
  })
}

export const UserSignin = json => dispatch => {
  return UserSignRequest(UserSigninOption, json)('post', '/signin')(dispatch)
}