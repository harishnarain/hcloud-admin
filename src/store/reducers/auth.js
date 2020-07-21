import { AuthenticationActions, AuthenticationState } from "react-aad-msal";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  initializing: false,
  initialized: false,
  idToken: null,
  accessToken: null,
  state: AuthenticationState.Unauthenticated,
  authRedirectPath: "/",
};

const authInitializing = (state, action) => {
  return updateObject(state, {
    initializing: true,
    initialized: false,
  });
};

const authInitialized = (state, action) => {
  return updateObject(state, {
    initializing: false,
    initialized: true,
  });
};

const authAcquiredIdTokenSuccess = (state, action) => {
  return updateObject(state, {
    idToken: action.payload,
  });
};

const authAcquiredAccessTokenSuccess = (state, action) => {
  return updateObject(state, {
    accessToken: action.payload,
  });
};

const authAcquiredAccessTokenError = (state, action) => {
  return updateObject(state, {
    accessToken: null,
  });
};

const authLoginSuccess = (state, action) => {
  return updateObject(state, {
    account: action.payload.account,
  });
};

const authLogoutSuccess = (state, action) => {
  return updateObject(state, {
    idToken: null,
    accessToken: null,
    account: null,
  });
};

const authAuthenticatedStateChanged = (state, action) => {
  return updateObject(state, {
    state: action.payload,
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthenticationActions.Initializing:
      return authInitializing(state, action);
    case AuthenticationActions.Initialized:
      return authInitialized(state, action);
    case AuthenticationActions.AcquiredIdTokenSuccess:
      return authAcquiredIdTokenSuccess(state, action);
    case AuthenticationActions.AcquiredAccessTokenSuccess:
      return authAcquiredAccessTokenSuccess(state, action);
    case AuthenticationActions.AcquiredAccessTokenError:
      return authAcquiredAccessTokenError(state, action);
    case AuthenticationActions.LoginSuccess:
      return authLoginSuccess(state, action);
    case AuthenticationActions.LoginError:
    case AuthenticationActions.AcquiredIdTokenError:
    case AuthenticationActions.LogoutSuccess:
      return authLogoutSuccess(state, action);
    case AuthenticationActions.AuthenticatedStateChanged:
      return authAuthenticatedStateChanged(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
