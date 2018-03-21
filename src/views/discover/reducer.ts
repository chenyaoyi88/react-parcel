import { ADD_TODO } from './action';

const initialState = {
    text: '默认值1'
};

const addTodoReducer = function (state: any = initialState, action: any) {
    let newState = {};
    switch (action.type) {
        case ADD_TODO:
            newState = {
                text: action.text
            };
            break;
        default:
            return state;
    }
    return Object.assign({}, state, newState);
};

export { addTodoReducer };