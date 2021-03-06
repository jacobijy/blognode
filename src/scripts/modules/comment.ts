import createCRUD, { IAction, ICommonState } from '../../../utils/createCRUD';

const { methods: { create, load, update, del }, createReducer } = createCRUD('comment', 'CRUD', 'comment');

export default function reducer(state: ICommonState = {}, action: IAction = {}) {
    return createReducer(state, action) || state;
}

export { create, load, update, del };
