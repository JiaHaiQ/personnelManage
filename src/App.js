import React from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
//引组件
import Login from './views/login/index';
import Index from './views/index/Index';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  };
  render(){
    return(
        <HashRouter>  
          <Switch>
            <Route exact component={Login} path="/"></Route>
            <Route exact component={Index} path="/index"></Route>
          </Switch>
        </HashRouter>
    )
  }
}

export default App;

//   <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
