import { put } from "redux-saga/effects";

import axios from "../../axios-users";
import * as actions from "../actions/index";

export function* fetchUsersSaga(action) {
  yield put(actions.fetchUsersStart());
  //const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
  try {
    //const response = yield axios.get('/users.json' + queryParams);
    const response = yield axios.get("users/", {
      headers: {
        Authorization: `Bearer ${action.token}`,
      },
    });
    const fetchedUsers = [];
    for (let key in response.data.value) {
      fetchedUsers.push({
        ...response.data.value[key],
      });
    }
    yield put(actions.fetchUsersSuccess(fetchedUsers));
  } catch (error) {
    yield put(actions.fetchUsersFail(error));
  }
}