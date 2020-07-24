import * as msal from "@azure/msal-browser";

import { msalConfig } from "../../authConfig";

const msalInstance = new msal.PublicClientApplication(msalConfig);

const signIn = () => {
  const loginRequest = {
    scopes: ["User.Read"],
  };

  msalInstance.loginRedirect(loginRequest);
};

export default signIn;
