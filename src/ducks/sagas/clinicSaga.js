import { call, put, takeLatest } from "redux-saga/effects";
import {
  doCreateClinic,
  doEditClinic,
  doGetAllClinics,
  doneClinic,
  doSearchClinic,
  doSwitchCollabClinic,
  doUpdateAuthClinic,
} from "../slices/clinicSlice";
import {
  requestCreateClinic,
  requestGetAllClinics,
  requestSearchClinic,
  requestUpdateClinic,
} from "../requests/clinicRequest";
import { failMessages, successMessages } from "../../constances/messages";
import { isEmptyData } from "../../utils";

export function* watchDoClinic() {
  yield takeLatest(doGetAllClinics.type, handleGetAllClinics);
  yield takeLatest(doCreateClinic.type, handleCreateClinic);
  yield takeLatest(doEditClinic.type, handleEditClinic);
  yield takeLatest(doUpdateAuthClinic.type, handleAuthClinic);
  yield takeLatest(doSwitchCollabClinic.type, handleCollabClinic);
  yield takeLatest(doSearchClinic.type, handleSearchClinic);
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
    const responseEdit = yield call(() => requestUpdateClinic(action.payload));

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

export function* handleAuthClinic(action) {
  try {
    const responseAuth = yield call(() => requestUpdateClinic(action.payload));

    const { status } = responseAuth.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllClinics());

      yield put(
        doneClinic({
          isOk: true,
          message: successMessages.UPDATE_AUTH_CLINIC,
          clinicList: responseGetAll.data.data,
        })
      );
    } else {
      yield put(
        doneClinic({
          isOk: false,
          message: failMessages.UPDATE_AUTH_CLINIC,
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
      requestUpdateClinic(action.payload)
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

export function* handleSearchClinic(action) {
  try {
    const { search } = action.payload;

    if (!isEmptyData(search)) {
      const responseSearch = yield call(() =>
        requestSearchClinic(action.payload)
      );

      const { status } = responseSearch.data;

      if (status === "OK") {
        const { data } = responseSearch.data;

        yield put(
          doneClinic({
            isOk: true,
            message: successMessages.GET_ALL_CLINICS,
            clinicList: [data],
          })
        );
      } else {
        yield put(
          doneClinic({
            isOk: false,
            message: failMessages.GET_ALL_CLINICS,
            clinicList: [],
          })
        );
      }
    } else {
      const response = yield call(() => requestGetAllClinics());

      const { status } = response.data;

      if (status === "OK") {
        const { data } = response.data;
        yield put(
          doneClinic({
            isOk: true,
            message: successMessages.GET_ALL_CLINICS,
            clinicList: data,
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
