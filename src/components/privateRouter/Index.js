import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getToken } from '@utils/cookies';
/** 私有路由 */
const privateRouter = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => (
      getToken() ? <Component {...routeProps} /> : <Redirect to="/" />
    )}
    />
  );
}

export default privateRouter;