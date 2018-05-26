import createCRUD from '../../../../utils/createCRUD';

const { methods: { create, load, update, del }, createReducer } = new createCRUD('comment', 'CRUD', 'comment');

export default function reducer(state = {}, action = {}) {
    return createReducer(state, action) || state;
}

export { create, load, update, del };