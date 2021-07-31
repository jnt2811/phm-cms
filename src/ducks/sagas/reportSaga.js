import { call, put, takeLatest } from "redux-saga/effects";
import { failMessages, successMessages } from "../../constances/messages";
import {
  doCreateReport,
  doGetAllReports,
  doneReport,
} from "../slices/reportSlice";
import {
  requestCreateReport,
  requestGetAllReports,
} from "../requests/reportRequest";

export function* watchDoReport() {
  yield takeLatest(doGetAllReports.type, handleGetAllReports);
  yield takeLatest(doCreateReport.type, handleCreateReport);
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

export function* handleCreateReport(action) {
  try {
    const responseCreate = yield call(() =>
      requestCreateReport(action.payload)
    );

    const { status } = responseCreate.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllReports());

      yield put(
        doneReport({
          isOk: true,
          message: successMessages.CREATE_NEW_REPORT,
          reportList: responseGetAll.data.data,
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
