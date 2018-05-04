import ApiClient from '../../../../utils/apiClient';

export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST'
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE'

const UserSignupRequset = (json) => (method) => (path) => {
  const request = new ApiClient();
  request[method](path)
}