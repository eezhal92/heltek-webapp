import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from './hooks';

export function PrivateRoute(props: RouteProps) {
  const { children, ...rest } = props;
  let auth = useAuth();
  const isAuthenticated = !auth.user.isNil();
  const renderFn = ({ location } : RouteProps) => isAuthenticated 
    ? children
    : (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location }
        }}
      />
    );

  return (
    <Route {...rest} render={renderFn} />
  );
}