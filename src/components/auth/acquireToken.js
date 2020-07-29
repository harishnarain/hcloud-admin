import * as msal from "@azure/msal-browser";

import { msalConfig } from "../../authConfig";

const msalInstance = new msal.PublicClientApplication(msalConfig);

const getTokenRedirect = async (user, request) => {
  /**
   * See here for more info on account retrieval:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  request.account = msalInstance.getAccountByUsername(user);
  return msalInstance.acquireTokenSilent(request).catch((error) => {
    console.warn(
      "silent token acquisition fails. acquiring token using redirect"
    );
    if (error instanceof msal.InteractionRequiredAuthError) {
      // fallback to interaction when silent call fails
      return msalInstance.acquireTokenRedirect(request);
    } else {
      console.warn(error);
    }
  });
};

const acquireToken = (user) => {
  const request = {
    scopes: ["User.ReadWrite.All"],
    forceRefresh: false,
  };

  return getTokenRedirect(user, request).then((response) => {
    return response;
  });
};

export default acquireToken;
