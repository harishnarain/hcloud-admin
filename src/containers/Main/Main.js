import React, { Component } from "react";

import { AzureAD, AuthenticationState } from "react-aad-msal";
import { authProvider } from "../../authProvider";
import { store } from "../../index";

class Main extends Component {
  render() {
    return (
      <div>
        <h2>Login Info</h2>
        <AzureAD provider={authProvider} reduxStore={store}>
          {({ accountInfo, authenticationState, error }) => {
            return (
              <React.Fragment>
                {authenticationState ===
                  AuthenticationState.Unauthenticated && (
                  <div>
                    <p>Currently not logged in!</p>
                  </div>
                )}

                <div className="SampleContainer">
                  <div className="SampleBox">
                    <h2 className="SampleHeader">Authenticated Values</h2>
                    <p>
                      When logged in, this box will show your tokens and user
                      info
                    </p>
                    {accountInfo && (
                      <div style={{ wordWrap: "break-word" }}>
                        <p>
                          <span style={{ fontWeight: "bold" }}>ID Token:</span>{" "}
                          {accountInfo.jwtIdToken}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>Username:</span>{" "}
                          {accountInfo.account.userName}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>
                            Access Token:
                          </span>{" "}
                          {accountInfo.jwtAccessToken}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                          {accountInfo.account.name}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="SampleBox">
                    <h2 className="SampleHeader">Errors</h2>
                    <p>
                      If authentication fails, this box will have the errors
                      that occurred
                    </p>
                    {error && (
                      <div style={{ wordWrap: "break-word" }}>
                        <p>
                          <span style={{ fontWeight: "bold" }}>errorCode:</span>{" "}
                          {error.errorCode}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>
                            errorMessage:
                          </span>{" "}
                          {error.errorMessage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          }}
        </AzureAD>
      </div>
    );
  }
}

export default Main;
