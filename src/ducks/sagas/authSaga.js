import { call, put, takeLatest } from "redux-saga/effects";
import {
  doGetUserInfo,
  doLogin,
  doLogout,
  doneAuth,
  doUpdateUserInfo,
} from "../slices/authSlice";
import localKeys from "../../constances/localKeys";
import {
  requestDoLogin,
  requestGetUserInfo,
  requestUpdateUserInfo,
} from "../requests/authRequest";
import { convertErrorCodeToMessage } from "../../utils";
import { failMessages, successMessages } from "../../constances/messages";

export function* watchDoAuth() {
  yield takeLatest(doLogin.type, handleLogin);
  yield takeLatest(doLogout.type, handleLogout);
  yield takeLatest(doGetUserInfo.type, handleGetUserInfo);
  yield takeLatest(doUpdateUserInfo.type, handleUpdateUserInfo);
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

export function* handleUpdateUserInfo(action) {
  try {
    const { id } = JSON.parse(localStorage.getItem(localKeys.USER_DATA));

    const data = { ...action.payload, id };

    const response = yield call(() => requestUpdateUserInfo(data));

    const { status } = response.data;

    if (status === "OK") {
      const newUserInfo = yield call(() => requestGetUserInfo(id));

      localStorage.setItem(
        localKeys.USER_DATA,
        JSON.stringify({
          id: newUserInfo.data.data.id,
          rest: newUserInfo.data.data,
        })
      );

      yield put(
        doneAuth({
          isOk: true,
          message: successMessages.UPDATE_USER_INFO,
          userData: newUserInfo.data.data,
        })
      );
    } else {
      yield put(
        doneAuth({
          isOk: false,
          message: failMessages.UPDATE_USER_INFO,
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

export function* handleGetUserInfo(action) {
  try {
    const { id } = JSON.parse(localStorage.getItem(localKeys.USER_DATA));

    const response = yield call(() => requestGetUserInfo(id));

    const { status } = response.data;

    if (status === "OK") {
      yield put(
        doneAuth({
          isOk: true,
          message: successMessages.GET_USER_INFO,
          userData: response.data.data,
        })
      );
    } else {
      yield put(
        doneAuth({
          isOk: false,
          message: failMessages.GET_USER_INFO,
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
