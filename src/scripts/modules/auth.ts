import createCRUD, { IAction, IState } from '../../../utils/createCRUD';

const { methods: { create, load, update, del }, createReducer } = new createCRUD('auth', 'CRUD', 'sign');

export default function reducer(state: IState = {}, action: IAction = {}) {
    return createReducer(state, action) || state;
}

export { create, load, update, del };
