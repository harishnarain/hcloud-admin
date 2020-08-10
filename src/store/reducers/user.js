import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  users: [],
  loading: false,
  deleted: false,
  added: false,
  error: null,
  updated: false,
};

const fetchUsersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchUsersSuccess = (state, action) => {
  return updateObject(state, {
    users: action.users,
    loading: false,
  });
};

const fetchUsersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const deleteUserStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const deleteUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    deleted: true,
  });
};

const deleteUserFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const deleteUserInit = (state, action) => {
  return updateObject(state, { deleted: false });
};

const addUserStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const addUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    added: true,
  });
};

const addUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const addUserInit = (state, action) => {
  return updateObject(state, { added: false });
};

const clearUserState = (state, action) => {
  return updateObject(state, {
    error: null,
    added: false,
    updated: false,
  });
};

const updateUserStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const updateUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    updated: true,
  });
};

const updateUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const updateUserInit = (state, action) => {
  return updateObject(state, { updated: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START:
      return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL:
      return fetchUsersFail(state, action);
    case actionTypes.DELETE_USER_START:
      return deleteUserStart(state, action);
    case actionTypes.DELETE_USER_SUCCESS:
      return deleteUserSuccess(state, action);
    case actionTypes.DELETE_USER_FAIL:
      return deleteUserFail(state, action);
    case actionTypes.DELETE_USER_INIT:
      return deleteUserInit(state, action);
    case actionTypes.ADD_USER_START:
      return addUserStart(state, action);
    case actionTypes.ADD_USER_SUCCESS:
      return addUserSuccess(state, action);
    case actionTypes.ADD_USER_FAIL:
      return addUserFail(state, action);
    case actionTypes.ADD_USER_INIT:
      return addUserInit(state, action);
    case actionTypes.CLEAR_USER_STATE:
      return clearUserState(state, action);
    case actionTypes.UPDATE_USER_START:
      return updateUserStart(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    case actionTypes.UPDATE_USER_FAIL:
      return updateUserFail(state, action);
    case actionTypes.UPDATE_USER_INIT:
      return updateUserInit(state, action);
    default:
      return state;
  }
};

export default reducer;
