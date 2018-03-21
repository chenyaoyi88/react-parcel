import { connect } from 'react-redux';
import { Discover } from './discover';

import { addTodo } from './action';

/**
字面含义是把 state 映射到 props 中去，意思就是把 Redux 中的数据映射到React中的 props 中去。

也就是说 React 想把 Redux 中的哪些数据拿过来用。

然后渲染的时候就可以直接使用 this.props.addTodoData 得到数据

 */
const mapStateToProps = (state: any): any => ({
    addTodoData: state.addTodoReducer.text
});

/**
 * 把各种 dispatch 也变成了props 让你可以直接使用
 * 在页面可以这样调用 this.props.handleAddTodo
 * @param dispatch - store dispatch
 */
const mapDispatchToProps = (dispatch: any): any => ({
    handleAddTodo: (text: string) => dispatch(addTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);