import React, { Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import Main from "./containers/Main/Main";
import Logout from "./components/Auth/Logout/Logout";
import Users from './containers/Users/Users';
import UsersRaw from './containers/UsersRaw/UsersRaw';

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const App = (props) => {
  let routes = (
    <Switch>
      <Route path="/usersraw" component={UsersRaw} />
      <Route path="/users" component={Users} />
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={Main} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth />} {...props} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

export default withRouter(connect(mapStateToProps)(App));
