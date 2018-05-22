import createCRUD from '../../../../utils/createCRUD';

const { methods: { load }, createReducer } = new createCRUD('articles', 'R', 'main')

export default function reducer(state = {}, action = {}) {
    return createReducer(state, action) || state;
}

export { load }