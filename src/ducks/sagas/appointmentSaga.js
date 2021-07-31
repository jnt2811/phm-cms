import { call, put, takeLatest } from "redux-saga/effects";
import { failMessages, successMessages } from "../../constances/messages";
import {
  doCreateAppointment,
  doGetAllAppointments,
  doneAppointment,
  // doDeleteAppointment,
} from "../slices/appointmentSlice";
import {
  requestCreateAppointment,
  requestGetAllAppointments,
} from "../requests/appointmentRequest";

export function* watchDoAppointment() {
  yield takeLatest(doGetAllAppointments.type, handleGetAllAppointments);
  yield takeLatest(doCreateAppointment.type, handleCreateAppointment);
  //   yield takeLatest(doDeleteAppointment.type, handleDeleteAppointment);
}

export function* handleGetAllAppointments(action) {
  try {
    const response = yield call(() => requestGetAllAppointments());

    const { status } = response.data;

    if (status === "OK") {
      yield put(
        doneAppointment({
          isOk: true,
          message: successMessages.GET_ALL_APPOINTMENTS,
          appointmentList: response.data.data,
        })
      );
    } else {
      yield put(
        doneAppointment({
          isOk: false,
          message: failMessages.GET_ALL_APPOINTMENTS,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneAppointment({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}

export function* handleCreateAppointment(action) {
  try {
    const responseCreate = yield call(() =>
      requestCreateAppointment(action.payload)
    );

    const { status } = responseCreate.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllAppointments());

      yield put(
        doneAppointment({
          isOk: true,
          message: successMessages.CREATE_NEW_APPOINTMENT,
          appointmentList: responseGetAll.data.data,
        })
      );
    } else {
      yield put(
        doneAppointment({
          isOk: false,
          message: failMessages.CREATE_NEW_APPOINTMENT,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneAppointment({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}
