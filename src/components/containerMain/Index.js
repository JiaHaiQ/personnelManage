import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
// 私有路由
import PrivateRouter from '../privateRouter/Index';
// 自动化
import Components from '../containerMain/components'
/** 内容组件 */
class ContainerMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  render() {
    return (
      <Switch>
        {
          Components.map(itme => {
            return <PrivateRouter exact key={itme.path} path={itme.path} component={itme.component} />
          })
        }
      </Switch>
    )
  }
}

export default ContainerMain;
