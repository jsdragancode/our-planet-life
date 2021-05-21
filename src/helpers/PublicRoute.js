import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      localStorage.getItem('token') ?
        <Redirect to="/" />
      : <Component {...props} />
    )} />
  );
};

export default PublicRoute;