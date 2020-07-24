import React, { Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Main from "./containers/Main/Main";
import { useStore } from "./hooks-store/store";

const Users = React.lazy(() => {
  return import("./containers/Users/Users");
});

const App = (props) => {
  const state = useStore()[0];

  let routes = (
    <Switch>
      <Route path="/" exact component={Main} />
      <Redirect to="/" />
    </Switch>
  );

  if (state.auth.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/users" component={Users} />
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

export default withRouter(App);
