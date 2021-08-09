import { call, put, takeLatest } from "redux-saga/effects";
import { failMessages, successMessages } from "../../constances/messages";
import {
  doCreateReport,
  doGetAllReports,
  doGetAllReportsByClinic,
  doneReport,
} from "../slices/reportSlice";
import {
  requestCreateReport,
  requestGetAllReports,
  requestGetAllReportsByClinic,
} from "../requests/reportRequest";
import localKeys from "../../constances/localKeys";

export function* watchDoReport() {
  yield takeLatest(doGetAllReports.type, handleGetAllReports);
  yield takeLatest(doCreateReport.type, handleCreateReport);
  yield takeLatest(doGetAllReportsByClinic.type, handleGetAllReportsByClinic);
}

export function* handleGetAllReports(action) {
  try {
    const response = yield call(() => requestGetAllReports());

    const { status } = response.data;

    if (status === "OK") {
      yield put(
        doneReport({
          isOk: true,
          message: successMessages.GET_ALL_REPORTS,
          reportList: response.data.data,
        })
      );
    } else {
      yield put(
        doneReport({
          isOk: false,
          message: failMessages.GET_ALL_REPORTS,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneReport({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}

export function* handleGetAllReportsByClinic(action) {
  try {
    const { id } = JSON.parse(localStorage.getItem(localKeys.USER_DATA));

    const response = yield call(() => requestGetAllReportsByClinic(id));

    const { status } = response.data;

    if (status === "OK") {
      yield put(
        doneReport({
          isOk: true,
          message: successMessages.GET_ALL_REPORTS,
          reportList: response.data.data,
        })
      );
    } else {
      yield put(
        doneReport({
          isOk: false,
          message: failMessages.GET_ALL_REPORTS,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneReport({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}

export function* handleCreateReport(action) {
  try {
    const response = yield call(() => requestCreateReport(action.payload));

    const { status } = response.data;

    if (status === "OK") {
      yield put(
        doneReport({
          isOk: true,
          message: successMessages.CREATE_NEW_REPORT,
        })
      );
    } else {
      yield put(
        doneReport({
          isOk: false,
          message: failMessages.CREATE_NEW_REPORT,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneReport({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}
