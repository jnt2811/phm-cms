import { takeLatest } from "redux-saga/effects";
import { doLogout } from "../slices/authSlice";
import localKeys from "../../constances/localKeys";

export function* watchDoAuth() {
  yield takeLatest(doLogout.type, handleLogout);
}

export function* handleLogout() {
  yield localStorage.removeItem(localKeys.ACCESS_TOKEN);
  yield localStorage.removeItem(localKeys.ROLE);
  window.location.reload();
}
