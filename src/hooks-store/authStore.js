import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    AUTH_SUCCESS: (curState, user) => {
      let updatedAuth = { ...curState.auth };
      updatedAuth = {
        ...curState.auth,
        authStatus: "auth_success",
        id: user.homeAccountId,
        username: user.username,
        idToken: null,
        accessToken: null,
        isAuthenticated: true,
      };
      return { auth: updatedAuth };
    },
    AUTH_CLEAR_STATUS: () => {
      let updatedAuth = {
        authStatus: "auth_init",
        id: null,
        username: null,
        idToken: null,
        accessToken: null,
        isAuthenticated: false,
      };
      return { auth: updatedAuth };
    },
    AUTH_START: (curState) => {
      let updatedAuth = { ...curState.auth };
      updatedAuth = {
        ...curState.auth,
        authStatus: "auth_start",
      };
      return { auth: updatedAuth };
    },
    AUTH_UPDATE_TOKEN: (curState, response) => {
      let updatedAuth = { ...curState.auth };
      updatedAuth = {
        ...curState.auth,
        idToken: response.idToken,
        accessToken: response.accessToken,
      };
      return { auth: updatedAuth };
    },
  };
  initStore(actions, {
    auth: {
      authStatus: "auth_init",
      id: null,
      username: null,
      idToken: null,
      accessToken: null,
      isAuthenticated: false,
    },
  });
};

export default configureStore;
