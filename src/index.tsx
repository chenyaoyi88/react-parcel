import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'

import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { renderRoutes } from 'react-router-config';

import './sass/index.scss';

// import { Button, Toast } from './components';
import { Contacts, Discover, Me, Wechat } from './views';

// import AuthExample from './auth_example';

const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
};

const store = createStore(reducer);

class App extends React.Component<any, any>{

  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    console.log(store);
  }

  render() {
    return (
      <div>
        <Counter
          value={store.getState()}
          onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
          onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        />
      </div>
    );
  }
}

ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById("root"));