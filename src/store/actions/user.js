import * as actionTypes from "./actionTypes";

export const fetchUsersSuccess = (users) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users,
  };
};

export const fetchUsersFail = (error) => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error: error,
  };
};

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START,
  };
};

export const fetchUsers = (token, queryType, query) => {
  return {
    type: actionTypes.FETCH_USERS,
    token: token,
    queryType: queryType,
    query: query,
  };
};

export const deleteUser = (token, users) => {
  return {
    type: actionTypes.DELETE_USER,
    token: token,
    users: users,
  };
};

export const deleteUserSuccess = () => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
  };
};

export const deleteUserFail = (error) => {
  return {
    type: actionTypes.DELETE_USER_FAIL,
    error: error,
  };
};

export const deleteUserStart = () => {
  return {
    type: actionTypes.DELETE_USER_START,
  };
};

export const deleteUserInit = () => {
  return {
    type: actionTypes.DELETE_USER_INIT,
  };
};

export const addUser = (token, user) => {
  return {
    type: actionTypes.ADD_USER,
    token: token,
    user: user,
  };
};

export const addUserSuccess = () => {
  return {
    type: actionTypes.ADD_USER_SUCCESS,
  };
};

export const addUserFail = (error) => {
  return {
    type: actionTypes.ADD_USER_FAIL,
    error: error,
  };
};

export const addUserStart = () => {
  return {
    type: actionTypes.ADD_USER_START,
  };
};

export const addUserInit = () => {
  return {
    type: actionTypes.ADD_USER_INIT,
  };
};

export const clearUserState = () => {
  return {
    type: actionTypes.CLEAR_USER_STATE,
  };
};
