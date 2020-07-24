import * as msal from "@azure/msal-browser";

import { msalConfig } from "../../authConfig";

const msalInstance = new msal.PublicClientApplication(msalConfig);

const handleResponse = (response) => {
  if (response !== null) {
    return response.account;
  } else {
    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    const currentAccounts = msalInstance.getAllAccounts();
    if (currentAccounts === null) {
      return "is_null";
    } else if (currentAccounts.length > 1) {
      // Add choose account code here
      return "is_multiple";
    } else if (currentAccounts.length === 1) {
      return currentAccounts[0];
    }
  }
};

const checkAccount = async () => {
  return msalInstance
    .handleRedirectPromise()
    .then(handleResponse)
    .then((user) => {
      if (user === "is_null" || user === "is_multiple") {
        return "is_error_or_null";
      } else {
        return user;
      }
    })
    .catch((error) => {
      return "is_error_or_null";
    });
};

export default checkAccount;
