import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";

import PrivateRoute from './helpers/PrivateRoute';
import PublicRoute from './helpers/PublicRoute';

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" exact component={Components} />
      <PublicRoute path="/signup-page" exact component={SignupPage}/>
      <PublicRoute path="/login-page" exact component={LoginPage}/>
      <PrivateRoute exact path="/profile-page" component={ProfilePage} />
      <PrivateRoute exact path="/landing-page" component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
