import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
//组件
import Login from './views/login/Index';
import Index from './views/index/Index';
import PrivateRouter from '@c/privateRouter/Index';

import { Provider } from 'react-redux';
import Store from '@/store/Index';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  render() {
    return (
      <Provider store={Store}>
        <BrowserRouter>
          <Switch>
            <Route exact render={() => <Login />} path="/" />
            <PrivateRouter component={Index} path="/index" />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
