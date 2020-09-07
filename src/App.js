import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
//引组件
import Login from './views/login/index';
import Index from './views/index/Index';
import PrivateRouter from './components/privateRouter/index';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  };
  render(){
    return(
        <BrowserRouter>  
          <Switch>
            <Route exact render={ ()=> <Login />} path="/" />
            <PrivateRouter component={ Index } path="/index" />
          </Switch>
        </BrowserRouter>
    )
  }
}

export default App;
