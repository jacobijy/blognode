import createCRUD, { IAction, ICommonState } from '../../../utils/createCRUD';

const { methods: { load }, createReducer } = createCRUD('articles', 'R', 'main');

export default function reducer(state: ICommonState = {}, action: IAction = {}) {
    return createReducer(state, action) || state;
}

export { load };
