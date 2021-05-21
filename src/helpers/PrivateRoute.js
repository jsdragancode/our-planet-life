import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login-page
    <Route {...rest} render={props => (
      localStorage.getItem('token') ?
        <Component {...props} />
      : <Redirect to="/" />
    )} />
  );
};

export default PrivateRoute;