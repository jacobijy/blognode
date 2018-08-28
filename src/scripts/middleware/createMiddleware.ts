import { Dispatch, AnyAction, MiddlewareAPI } from 'redux';
import ApiClient from '../../../utils/apiClient';
import { ICombineActions } from '../../../utils/createCRUD';
import { Action } from 'history';

type func = (...args: any[]) => void;
interface IExtraDispatch<S, E, A extends Action> {
    <T extends A>(action: T): T;
    <R>(asyncAction: ExtraAction<R, S, E, A>): R;
}

type ExtraAction<R, S, E, A extends Action> = (
    dispatch: IExtraDispatch<S, E, A>,
    getState: () => S,
    extraArgument: E
) => R;

const createMiddleware = (client: ApiClient) => ({ dispatch, getState }: MiddlewareAPI) =>
    (next: Dispatch<AnyAction>) => (action: ICombineActions | func) => {
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
            (result: { [key: string]: any }) => next({ ...rest, result, type: SUCCESS }),
            (err: Error) => next({ ...rest, err, type: FAILURE })
        ).catch((err: Error) => {
            // console.error('MIDDLEWARE ERROR:', err);
            next({ ...rest, err, type: FAILURE });
        });

        return actionPromise;
    };


export default createMiddleware;
