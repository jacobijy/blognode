const createMethod = (method, types, prefix) => ({ params, data } = {}) => ({
    types: types,
    promise: client => client[method](prefix, { params, data })
})

const createMethodAndConstants = (prefix, actions: string, action, constants, methods, name, pagename) => {
    pagename = pagename ? '-' + pagename : ''
    if (actions.includes(action)) {
        let types = [
            `${prefix}${pagename}/${name}`,
            `${prefix}${pagename}/${name}_SUCCESS`,
            `${prefix}${pagename}/${name}_FAIL`
        ]
        //constants
        Object.assign(constants, {
            [name]: types[0],
            [name + '_SUCCESS']: types[1],
            [name + '_FAIL']: types[2]
        })

        switch (action) {
            case 'C':
                methods.create = createMethod('post', types, prefix)
                break;

            case 'R':
                methods.load = createMethod('get', types, prefix)
                break;

            case 'U':
                methods.update = createMethod('put', types, prefix)
                break;

            case 'D':
                methods.del = createMethod('delete', types, prefix)
                break;

            default:
                break;
        }
    }
}

export default class createCRUD {
    constructor(prefix, actions: string, pagename) {
        const constants = {};
        const methods = {};
        const actionsMap = {
            'C': 'CREATE',
            'U': 'UPDATE',
            'R': 'LOAD',
            'D': 'DELETE'
        };

        [...actions].map((action, index, actions) => {
            createMethodAndConstants(prefix, actions, action, constants, methods, actionsMap[action], pagename)
        })

        const createReducer = (state, action) => {
            switch (action.type) {
                case constants.LOAD:
                    return {
                        ...state,
                        loading: true
                    };
                case constants.LOAD_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        loaded: true,
                        loadData: action.result,
                        loadError: null
                    };
                case constants.LOAD_FAIL:
                    return {
                        ...state,
                        loading: false,
                        loaded: false,
                        loadData: null,
                        loadError: action.error
                    };
                case constants.CREATE:
                case constants.UPDATE:
                    return {
                        ...state,
                        editing: true
                    };
                case constants.CREATE_SUCCESS:
                case constants.UPDATE_SUCCESS:
                    return {
                        ...state,
                        editing: false,
                        edited: true,
                        editData: action.result,
                        editError: null
                    };
                case constants.CREATE_FAIL:
                case constants.UPDATE_FAIL:
                    return {
                        ...state,
                        editing: false,
                        edited: false,
                        editData: null,
                        editError: action.error
                    };
                case constants.DELETE:
                    return {
                        ...state,
                        deleteing: true
                    };
                case constants.DELETE_SUCCESS:
                    return {
                        ...state,
                        deleteing: false,
                        deleted: true,
                        deleteData: action.result,
                        deleteError: null
                    };
                case constants.DELETE_FAIL:
                    return {
                        ...state,
                        deleteing: false,
                        deleted: false,
                        deleteData: null,
                        deleteError: action.error
                    };
            }
        }

        return { methods, createReducer }
    }
}