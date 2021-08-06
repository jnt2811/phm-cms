import { call, put, takeLatest } from "redux-saga/effects";
import {
  doLogin,
  doLogout,
  doneAuth,
  doUpdateUserPass,
} from "../slices/authSlice";
import localKeys from "../../constances/localKeys";
import {
  requestDoLogin,
  requestDoUpdateUserPass,
} from "../requests/authRequest";
import { convertErrorCodeToMessage } from "../../utils";
import { failMessages, successMessages } from "../../constances/messages";

export function* watchDoAuth() {
  yield takeLatest(doLogin.type, handleLogin);
  yield takeLatest(doLogout.type, handleLogout);
  yield takeLatest(doUpdateUserPass.type, handleUpdateUserPass);
}

export function* handleLogout() {
  yield localStorage.removeItem(localKeys.ACCESS_TOKEN);
  yield localStorage.removeItem(localKeys.USER_DATA);
  window.location.reload();
}

export function* handleLogin(action) {
  try {
    const response = yield call(() => requestDoLogin(action.payload));

    const { status } = response.data;

    if (status === "OK") {
      localStorage.setItem(localKeys.ACCESS_TOKEN, response.data.access_token);
      localStorage.setItem(
        localKeys.USER_DATA,
        JSON.stringify(response.data.user)
      );

      yield put(
        doneAuth({
          isOk: true,
          message: successMessages.LOGIN,
          userData: response.data.user,
        })
      );
    } else {
      yield put(
        doneAuth({
          isOk: false,
          message: convertErrorCodeToMessage(response.data.errorCode),
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneAuth({
        isOk: false,
        message: error.message,
      })
    );
  }
}

export function* handleUpdateUserPass(action) {
  try {
    const response = yield call(() => requestDoUpdateUserPass(action.payload));

    const { status } = response.data;

    if (status === "OK") {
      yield put(
        doneAuth({
          isOk: true,
          message: successMessages.UPDATE_USER_PASS,
        })
      );
    } else {
      yield put(
        doneAuth({
          isOk: false,
          message: failMessages.UPDATE_USER_PASS,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneAuth({
        isOk: false,
        message: error.message,
      })
    );
  }
}
