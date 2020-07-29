import { takeEvery, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { fetchUsersSaga, deleteUserSaga } from "./user";

export function* watchUser() {
  yield takeEvery(actionTypes.FETCH_USERS, fetchUsersSaga);
  yield takeLatest(actionTypes.DELETE_USER, deleteUserSaga);
}
