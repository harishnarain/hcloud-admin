import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { fetchUsersSaga, deleteUserSaga, addUserSaga, updateUserSaga } from "./user";

export function* watchUser() {
  yield takeEvery(actionTypes.FETCH_USERS, fetchUsersSaga);
  yield takeEvery(actionTypes.DELETE_USER, deleteUserSaga);
  yield takeEvery(actionTypes.ADD_USER, addUserSaga);
  yield takeEvery(actionTypes.UPDATE_USER, updateUserSaga);
}
