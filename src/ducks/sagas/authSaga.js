import { call, put, takeLatest } from "redux-saga/effects";
import {
  doLogin,
  doLogout,
  loginFail,
  loginSuccess,
} from "../slices/authSlice";
import localKeys from "../../constances/localKeys";
import { requestDoLogin } from "../requests/authRequest";
import { convertErrorCodeToMessage } from "../../utils";

export function* watchDoAuth() {
  yield takeLatest(doLogin.type, handleLogin);
  yield takeLatest(doLogout.type, handleLogout);
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
        loginSuccess({
          isOk: true,
          message: "Đăng nhập thành công",
          userData: response.data.user,
        })
      );
    } else {
      yield put(
        loginFail({
          isOk: false,
          message: convertErrorCodeToMessage(response.data.errorCode),
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      loginFail({
        isOk: false,
        message: error.message,
      })
    );
  }
}

export function* handleLogout() {
  yield localStorage.removeItem(localKeys.ACCESS_TOKEN);
  yield localStorage.removeItem(localKeys.USER_DATA);
  window.location.reload();
}
