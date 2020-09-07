import React from 'react';
import {Switch} from 'react-router-dom';

import User from '../../views/user/index';
import AddUser from '../../views/user/AddUser';
import PrivateRouter from '../privateRouter/index';

class ContainerMain extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  };
  render(){
    return(
        <Switch>
            <PrivateRouter exact path="/index/user/list" component={ User } />
            <PrivateRouter exact path="/index/user/add" component={ AddUser } />
        </Switch>
    )
  }
}

export default ContainerMain;
