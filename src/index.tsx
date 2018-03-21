import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'

import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const history = createHistory();

import { renderRoutes } from 'react-router-config';

import './sass/index.scss';

import { Button, Toast, Loading } from './components';

// import { Contacts, Discover, Me, Wechat } from './views';

import Discover from './views/discover/container';

// import AuthExample from './auth_example';

import configureStore from './store';

import styled from "styled-components";
const StyledView = styled.div`
  transform: rotate(0deg);
`;


class App extends React.Component<any, any>{

  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
  }

  showToast() {
    Toast.show({
      content: '恭喜发财',
    });
  }

  showLoading() {
    Loading.show({
      content: '恭喜发财'
    });

    setTimeout(() => { 
      Loading.hide();
    }, 3000);
  }

  render() {
    return (
      <StyledView>
        <Button onClick={() => this.showToast()}> toast</Button>
        <hr />
        <Button onClick={() => this.showLoading()}> loading</Button>
      </StyledView>
    );
  }
}

// 一般我们都将顶层组件包裹在 Provider 组件之中，这样的话，所有组件就都可以在 react-redux 的控制之下了,但是 store 必须作为参数放到Provider 组件中去

ReactDOM.render((
  // <Provider store={configureStore()}>
  <Router>
    <App />
  </Router>
  // </Provider>
), document.getElementById("root"));