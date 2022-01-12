import authService from '@services/authService';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const AdminRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  return authService.isAdmin() ? (
    <Route exact {...props}>
      {children}
    </Route>
  ) : (
    <Redirect to="/home" />
  );
};

export default AdminRoute;
