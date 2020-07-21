import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AzureAD, LoginType, AuthenticationState } from "react-aad-msal";

import * as actions from "../../store/actions/index";
import { store } from "../../index";

// Import the authentication provider which holds the default settings
import { authProvider } from "../../authProvider";

const Auth = (props) => {
  const { authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [authRedirectPath, onSetAuthRedirectPath]);

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  const options = authProvider.getProviderOptions();
  options.loginType = LoginType.Redirect;
  authProvider.setProviderOptions(options);

  return (
    <AzureAD provider={authProvider} reduxStore={store}>
      {({ login, logout, authenticationState }) => {
        const isInProgress =
          authenticationState === AuthenticationState.InProgress;
        const isAuthenticated =
          authenticationState === AuthenticationState.Authenticated;
        const isUnauthenticated =
          authenticationState === AuthenticationState.Unauthenticated;

        if (isAuthenticated) {
          return <p>loggedin</p>;
        } else if (isUnauthenticated || isInProgress) {
          login();
        }
      }}
    </AzureAD>
  );
};

const mapStateToProps = (state) => {
  return {
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
