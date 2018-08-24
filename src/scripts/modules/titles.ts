import createCRUD, { IAction, IState } from '../../../utils/createCRUD';

const { methods: { load }, createReducer } = new createCRUD('titles', 'R', 'editor');

export default function reducer(state: IState = {}, action: IAction = {}) {
    return createReducer(state, action) || state;
}

export { load };
