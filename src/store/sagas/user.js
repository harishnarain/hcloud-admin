import { put } from "redux-saga/effects";

import axios from "../../axios-users";
import * as actions from "../actions/index";

export function* fetchUsersSaga(action) {
  yield put(actions.fetchUsersStart());
  //const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
  //const queryParams = '?$filter=startswith(displayName,\'' + action.query + '\')';
  let queryParams = "";
  if (action.query) {
    queryParams = "?$filter=startswith(displayName,'" + action.query + "')";
  }
  try {
    //const response = yield axios.get('/users.json' + queryParams);

    const response = yield axios.get("users" + queryParams, {
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

export function* deleteUserSaga(action) {
  yield put(actions.deleteUserStart());
  try {
    for (let user in action.users) {
      // eslint-disable-next-line
      const response = yield axios.delete("users/" + action.users[user].id, {
        headers: {
          Authorization: `Bearer ${action.token}`,
        },
      });
    }

    yield put(actions.deleteUserSuccess());
  } catch (error) {
    yield put(actions.deleteUserFail(error));
  }
}

export function* addUserSaga(action) {
  yield put(actions.addUserStart());
  const mailNickname = action.user.userData.displayname.replace(/\s+/g, "");
  const user = {
    accountEnabled: true,
    givenName: action.user.userData.firstname,
    surname: action.user.userData.lastname,
    displayName: action.user.userData.displayname,
    mailNickname: mailNickname,
    userPrincipalName: action.user.userData.email,
    passwordProfile: {
      forceChangePasswordNextSignIn: true,
      password: action.user.userData.password,
    },
  };
  try {
    // eslint-disable-next-line
    const response = yield axios.post("users", user, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${action.token}`,
      },
    });
    yield put(actions.addUserSuccess());
  } catch (error) {
    yield put(actions.addUserFail(error.response.data.error));
  }
}

export function* updateUserSaga(action) {
  yield put(actions.updateUserStart());

  let userData = {};

  for (let identifier in action.user.userData) {
    if (identifier === "password") {
      // Resetting password can only work if Directory.AccessAsUser.All role is assigned.
      userData = {
        passwordProfile: {
          forceChangePasswordNextSignIn: true,
          password: action.user.userData.password,
        },
      };
    } else {
      userData[identifier] = action.user.userData[identifier];
    }
  }

  try {
    // eslint-disable-next-line
    const response = yield axios.patch("users/" + action.id, userData, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${action.token}`,
      },
    });
    yield put(actions.updateUserSuccess());
  } catch (error) {
    yield put(actions.updateUserFail(error.response.data.error));
  }
}
