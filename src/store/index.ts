
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { addTodoReducer } from '../views/discover/reducer';

import thunk from 'redux-thunk';

// const store = createStore(
//     combineReducers({ addTodoReducer }),
//     applyMiddleware(thunk)
// );

const configureStore = () => {

    const { hot } = module as any;

    const store = createStore(
        combineReducers({ addTodoReducer }),
        applyMiddleware(thunk)
    );


    if (hot) {
        // console.log('热更新了');
        // 当每次保存触发热替换/更新的时候

        hot.dispose(() => {
            // 模块即将被替换时
            const nextRootReducer = combineReducers(require('../views/discover/reducer'));
            store.replaceReducer(nextRootReducer);
        });

        // hot.accept(function () { 
        //     // 模块或其依赖项之一刚刚更新时
        //     console.log('模块或其依赖项之一刚刚更新时');
        // });

    }

    return store;
}

// export default function configureStore() {
//     if (module.hot) {
//         module.hot.accept('./reducers/index', () => {
//             const nextRootReducer = combineReducers(require('./reducers/index'));
//             store.replaceReducer(nextRootReducer);
//         });
//     }

//     const reducer = combineReducers(require('./reducers/index'));
//     const store = createStore(reducer);
//     return store;
// }

export default configureStore;