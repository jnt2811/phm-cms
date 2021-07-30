import { call, put, takeLatest } from "redux-saga/effects";
import {
  doCreateClinic,
  doEditClinic,
  doGetAllClinics,
  doneClinic,
  doSwitchCollabClinic,
  doUpdatePassClinic,
} from "../slices/clinicSlice";
import {
  requestCreateClinic,
  requestEditClinic,
  requestGetAllClinics,
  requestSwitchCollabClinic,
  requestUpdatePassClinic,
} from "../requests/clinicRequest";
import { failMessages, successMessages } from "../../constances/messages";

export function* watchDoClinic() {
  yield takeLatest(doGetAllClinics.type, handleGetAllClinics);
  yield takeLatest(doCreateClinic.type, handleCreateClinic);
  yield takeLatest(doEditClinic.type, handleEditClinic);
  yield takeLatest(doUpdatePassClinic.type, handlePasswordClinic);
  yield takeLatest(doSwitchCollabClinic.type, handleCollabClinic);
}

export function* handleGetAllClinics(action) {
  try {
    const response = yield call(() => requestGetAllClinics());

    const { status } = response.data;

    if (status === "OK") {
      yield put(
        doneClinic({
          isOk: true,
          message: successMessages.GET_ALL_CLINICS,
          clinicList: response.data.data,
        })
      );
    } else {
      yield put(
        doneClinic({
          isOk: false,
          message: failMessages.GET_ALL_CLINICS,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneClinic({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}

export function* handleCreateClinic(action) {
  try {
    const responseCreate = yield call(() =>
      requestCreateClinic(action.payload)
    );

    const { status } = responseCreate.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllClinics());

      yield put(
        doneClinic({
          isOk: true,
          message: successMessages.CREATE_NEW_CLINIC,
          clinicList: responseGetAll.data.data,
        })
      );
    } else {
      yield put(
        doneClinic({
          isOk: false,
          message: failMessages.CREATE_NEW_CLINIC,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneClinic({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}

export function* handleEditClinic(action) {
  try {
    const responseEdit = yield call(() => requestEditClinic(action.payload));

    const { status } = responseEdit.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllClinics());

      yield put(
        doneClinic({
          isOk: true,
          message: successMessages.EDIT_NEW_CLINIC,
          clinicList: responseGetAll.data.data,
        })
      );
    } else {
      yield put(
        doneClinic({
          isOk: false,
          message: failMessages.EDIT_NEW_CLINIC,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneClinic({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}

export function* handlePasswordClinic(action) {
  try {
    const responsePass = yield call(() =>
      requestUpdatePassClinic(action.payload)
    );

    const { status } = responsePass.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllClinics());

      yield put(
        doneClinic({
          isOk: true,
          message: successMessages.UPDATE_PASSWORD_CLINIC,
          clinicList: responseGetAll.data.data,
        })
      );
    } else {
      yield put(
        doneClinic({
          isOk: false,
          message: failMessages.UPDATE_PASSWORD_CLINIC,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneClinic({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}

export function* handleCollabClinic(action) {
  console.log(action.payload);

  try {
    const responseCollab = yield call(() =>
      requestSwitchCollabClinic(action.payload)
    );

    const { status } = responseCollab.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllClinics());

      yield put(
        doneClinic({
          isOk: true,
          message: successMessages.SWITCH_COLLAB_CLINIC,
          clinicList: responseGetAll.data.data,
        })
      );
    } else {
      yield put(
        doneClinic({
          isOk: false,
          message: failMessages.SWITCH_COLLAB_CLINIC,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneClinic({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}
