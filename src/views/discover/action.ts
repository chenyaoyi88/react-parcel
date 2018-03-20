export const ADD_TODO = '添加 TODO';

function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}

export { addTodo };