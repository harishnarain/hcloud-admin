import * as msal from "@azure/msal-browser";

import { msalConfig } from "../../authConfig";

const msalInstance = new msal.PublicClientApplication(msalConfig);

const signOut = (username) => {
  const logoutRequest = {
    account: msalInstance.getAccountByUsername(username),
  };

  msalInstance.logout(logoutRequest);
};

export default signOut;
