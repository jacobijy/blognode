import ApiClient from '../../../../utils/apiClient';

export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST'
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE'

const UserSignupOption = {
  Request: (json) => ({
    type: USER_SIGNUP_REQUEST,
    json
  }),

  Failure: (err) => ({
    type: USER_SIGNUP_FAILURE,
  err
  }),

  Success: () => ({
    type: USER_SIGNUP_SUCCESS
  })
}

const UserSignRequest = (action, json) => (method, path = '') => (dispatch) =>{
  dispatch(action.Request(json))
  const request = new ApiClient();
  let promise = request[method](path, { data: json })
  promise.then((result) => {
    console.log('result', result);
    return dispatch(action.Success(result))
  }).catch((err) => {
    console.log('err', err);
    return dispatch(action.Failure(err));
  });
}

export var UserSignup = json => dispatch => {
  return UserSignRequest(json, UserSignupOption)('post', '/signup')(dispatch)
}

export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST'
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS'
export const USER_SIGNIN_FAILURE = 'USER_SIGNIN_FAILURE'

const UserSigninOption = {
  Request: (json) => ({
    type: USER_SIGNIN_REQUEST,
    json
  }),

  Failure: (err) => ({
    type: USER_SIGNIN_FAILURE,
  err
  }),

  Success: () => ({
    type: USER_SIGNIN_SUCCESS
  })
}

export const UserSignin = json => dispatch => {
  return UserSignRequest(json, UserSigninOption)('post', '/signin')(dispatch)
}