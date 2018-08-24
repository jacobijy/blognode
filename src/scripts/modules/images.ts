import createCRUD, { IAction, ICommonState } from '../../../utils/createCRUD';

const { methods: { create, load, update, del }, createReducer } = new createCRUD('images', 'CRUD', 'editor');

export default function reducer(state: ICommonState = {}, action: IAction = {}) {
    return createReducer(state, action) || state;
}

export { create, load, update, del };
