import { ADD_TODO } from './action';

const reducer = function (state, action) {
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

export { reducer };