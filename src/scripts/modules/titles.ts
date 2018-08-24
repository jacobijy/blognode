import createCRUD, { IAction, ICommonState } from '../../../utils/createCRUD';

const { methods: { load }, createReducer } = new createCRUD('titles', 'R', 'editor');

export default function reducer(state: ICommonState = {}, action: IAction = {}) {
    return createReducer(state, action) || state;
}

export { load };
