import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { fetchUsersSaga } from "./user";

export function* watchUser() {
  yield takeEvery(actionTypes.FETCH_USERS, fetchUsersSaga);
}
