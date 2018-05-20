import createCRUD from '../../../../utils/createCRUD';

const { methods: { load }, createReducer } = new createCRUD('titles', 'R', 'editor')

export default function reducer(state = {}, action = {}) {
    return createReducer(state, action) || state;
}

export { load }