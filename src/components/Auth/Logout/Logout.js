import React from "react";
import { Redirect } from "react-router-dom";
import { AzureAD } from "react-aad-msal";

import { store } from "../../../index";

// Import the authentication provider which holds the default settings
import { authProvider } from "../../../authProvider";
import Aux from "../../../hoc/Aux/Aux";

const Logout = (props) => {
  return (
    <Aux>
      <AzureAD provider={authProvider} reduxStore={store}>
        {({ logout }) => {
          logout();
        }}
      </AzureAD>
      <Redirect to="/" />
    </Aux>
  );
};

export default Logout;
