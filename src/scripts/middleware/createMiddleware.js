const createMiddleware = (client) => {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState)
        }

        const { types, promise, ...rest } = action
        if (!promise) {
            next(action);
        }

        const [REQUEST, SUCCESS, FAILURE] = types;
        next({ ...rest, type: REQUEST });

        const actionPromise = promise(client)
        actionPromise.then(
            result => next({ ...rest, result, type: SUCCESS }),
            err => next({ ...rest, err, type: FAILURE })
        ).catch((err) => {
            console.error('MIDDLEWARE ERROR:', err);
            next({ ...rest, err, type: FAILURE });
        });

        return actionPromise
    }
}

export default createMiddleware