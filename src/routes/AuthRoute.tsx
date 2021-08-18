import authService from '@services/authService';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const AuthRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  return authService.isAuthenticated() ? (
    <Route exact {...props}>
      {children}
    </Route>
  ) : (
    <Redirect to="/" />
  );
};

export default AuthRoute;
