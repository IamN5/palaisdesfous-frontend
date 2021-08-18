import { useUserContext } from '@context/userContext';
import authService from '@services/authService';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const AdminRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const { state } = useUserContext();

  console.log(`State on AdminRoute is {${state.user}, ${state.auth}}`);

  return authService.isAdmin() ? (
    <Route exact {...props}>
      {children}
    </Route>
  ) : (
    <Redirect to="/home" />
  );
};

export default AdminRoute;
