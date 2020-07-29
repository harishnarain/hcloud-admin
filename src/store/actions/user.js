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

export const deleteUser = (token, id) => {
  return {
    type: actionTypes.DELETE_USER,
    token: token,
    id: id,
  };
};

export const deleteUserSuccess = (users) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    users: users,
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