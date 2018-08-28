import ApiClient, { methodName } from './apiClient';
import { AnyAction, Action } from 'redux';

const createMethod = (method: methodName, types: string[], prefix: string) =>
    ({ params, data }: { params?: object, data?: object } = {}) => ({
        types,
        promise: (client: ApiClient) => client[method](prefix, { params, data })
    });

export interface ICombineActions {
    types: string[],
    promise: (client: ApiClient) => Promise<any>;
}
export type methodFunc = ({ params, data }: { params?: object, data?: object }) => ICombineActions;
export interface IMethods {
    create?: methodFunc;
    load?: methodFunc;
    update?: methodFunc;
    del?: methodFunc;
}
export interface ISpecificAction extends AnyAction {
    params?: any;
    data?: any;
}

const createMethodAndConstants = (
    prefix: string,
    actions: string[],
    action: string,
    constants: { [key: string]: any },
    methods: IMethods,
    name: string,
    pagename: string) => {
    pagename = pagename ? '-' + pagename : '';
    if (actions.includes(action)) {
        let types = [
            `${prefix}${pagename}/${name}`,
            `${prefix}${pagename}/${name}_SUCCESS`,
            `${prefix}${pagename}/${name}_FAIL`
        ];
        // constants
        Object.assign(constants, {
            [name]: types[0],
            [name + '_SUCCESS']: types[1],
            [name + '_FAIL']: types[2]
        });

        switch (action) {
            case 'C':
                methods.create = createMethod('post', types, prefix);
                break;

            case 'R':
                methods.load = createMethod('get', types, prefix);
                break;

            case 'U':
                methods.update = createMethod('put', types, prefix);
                break;

            case 'D':
                methods.del = createMethod('delete', types, prefix);
                break;

            default:
                break;
        }
    }
};

export interface ICommonState {
    loading?: boolean;
    loaded?: boolean;
    editting?: boolean;
    editted?: boolean;
    deleteing?: boolean;
    deleted?: boolean;
    loadData?: any;
    loadError?: any;
    editData?: any;
    editError?: any;
    deleteData?: any;
    deleteError?: any;
}

export interface IAction {
    type?: string | symbol;
    result?: any;
    error?: any;
}

export default function CreateCRUD(prefix: string, actions: string, pagename: string) {
    const constants: { [key: string]: string } = {};
    const methods: IMethods = {};
    const actionsMap = {
        C: 'CREATE',
        U: 'UPDATE',
        R: 'LOAD',
        D: 'DELETE'
    };

    [...actions].map((action: 'C' | 'R' | 'U' | 'D', index, newActions) => {
        createMethodAndConstants(prefix, newActions, action, constants, methods, actionsMap[action], pagename);
    });
    const createReducer: (state: ICommonState, action: IAction) => ICommonState = (
        state: ICommonState = {
            loading: false,
            loaded: false,
            loadData: {},
            loadError: null
        },
        action: IAction) => {
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
    };

    return { methods, createReducer };
}
