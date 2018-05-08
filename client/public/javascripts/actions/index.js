import ApiClient from '../../../../utils/apiClient';

export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST'
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE'

const UserSignupOption = {
  Request: (json) => ({
    type: USER_SIGNUP_REQUEST,
    data: json
  }),

  Failure: (err) => ({
    type: USER_SIGNUP_FAILURE,
    data: err
  }),

  Success: (json) => ({
    type: USER_SIGNUP_SUCCESS,
    data: json
  })
}

const RequestAction = (action, json) => (method, path = '') => (dispatch) => {
  dispatch(action.Request(json))
  const request = new ApiClient();
  let promise = request[method](path, { data: json })
  promise.then((result) => {
    return result.err ? dispatch(action.Failure(result)) : dispatch(action.Success(result))
  }).catch((err) => {
    console.log('err', err);
  });
}

export const UserSignup = (method, json) => dispatch => {
  return RequestAction(UserSignupOption, json)(method, '/signup')(dispatch)
}

export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST'
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS'
export const USER_SIGNIN_FAILURE = 'USER_SIGNIN_FAILURE'

const UserSigninOption = {
  Request: (json) => ({
    type: USER_SIGNIN_REQUEST,
    data: json
  }),

  Failure: (err) => ({
    type: USER_SIGNIN_FAILURE,
    data: err
  }),

  Success: (json) => ({
    type: USER_SIGNIN_SUCCESS,
    data: json
  })
}

export const UserSignin = (method, json) => dispatch => {
  return RequestAction(UserSigninOption, json)(method, '/signin')(dispatch)
}

export const Articles_Main_Page_Request = 'Articles_Main_Page_Request'
export const Articles_Main_Page_SUCCESS = 'Articles_Main_Page_SUCCESS'
export const Articles_Main_Page_LOADMORE = 'Articles_Main_Page_LOADMORE'
export const Articles_Main_Page_FAILURE = 'Articles_Main_Page_FALIURE'

const ArticleMainPageOption = {
  Request: (json) => ({
    type: Articles_Main_Page_Request,
    data: json
  }),

  Failure: (err) => ({
    type: Articles_Main_Page_FAILURE,
    data: err
  }),

  Success: (json) => ({
    type: Articles_Main_Page_SUCCESS,
    data: json
  })
}

export const ArticlesMainPage = (method, json) => dispatch => {
  return RequestAction(ArticleMainPageOption, json)(method, '/articles')(dispatch);
}