import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Orders from '@pages/Orders';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import AuthRoute from './AuthRoute';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <AuthRoute path="/home">
        <Home />
      </AuthRoute>
      <AdminRoute path="/admin">
        <div>Admin</div>
      </AdminRoute>
      <AuthRoute path="/pedidos">
        <Home>
          <Orders />
        </Home>
      </AuthRoute>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
