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

export const fetchUsers = (token) => {
  return {
    type: actionTypes.FETCH_USERS,
    token: token,
  };
};
