import ApiClient from '../../../utils/apiClient';
import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

interface IMiddlewareAction {
    types: string[];
    promise: (client: ApiClient) => Promise<any>;
}

const createMiddleware = (client: ApiClient) => {
    return ({ dispatch, getState }: MiddlewareAPI) =>
        (next: Dispatch<AnyAction>) => (action: IMiddlewareAction | ((...args: any[]) => void)) => {
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            const { types, promise, ...rest } = action;
            if (!promise) {
                next(action);
            }

            const [REQUEST, SUCCESS, FAILURE] = types;
            next({ ...rest, type: REQUEST });

            const actionPromise = promise(client);
            actionPromise.then(
                result => next({ ...rest, result, type: SUCCESS }),
                err => next({ ...rest, err, type: FAILURE })
            ).catch((err) => {
                console.error('MIDDLEWARE ERROR:', err);
                next({ ...rest, err, type: FAILURE });
            });

            return actionPromise;
        };
};

export default createMiddleware;
