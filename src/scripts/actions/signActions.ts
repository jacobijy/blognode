
export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';

const UserSignupOption = {
    Request: (json: object) => ({
        type: USER_SIGNUP_REQUEST,
        data: json
    }),

    Failure: (err: Error) => ({
        type: USER_SIGNUP_FAILURE,
        data: err
    }),

    Success: (json: object) => ({
        type: USER_SIGNUP_SUCCESS,
        data: json
    })
};

export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST';
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
export const USER_SIGNIN_FAILURE = 'USER_SIGNIN_FAILURE';

const UserSigninOption = {
    Request: (json: object) => ({
        type: USER_SIGNIN_REQUEST,
        data: json
    }),

    Failure: (err: Error) => ({
        type: USER_SIGNIN_FAILURE,
        data: err
    }),

    Success: (json: object) => ({
        type: USER_SIGNIN_SUCCESS,
        data: json
    })
};

export { UserSigninOption, UserSignupOption };
