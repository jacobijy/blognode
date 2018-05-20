import createCRUD from '../../../../utils/createCRUD';

const { methods: { create, load, update, del }, createReducer } = new createCRUD('image', 'CRUD', 'editor')

export default function reducer(state = {}, action = {}) {
    return createReducer(state, action) || state
}

export { create, load, update, del }