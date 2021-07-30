import { call, put, takeLatest } from "redux-saga/effects";
import {
  doCreateVolunteer,
  doEditVolunteer,
  doGetAllVolunteers,
  doneVolunteer,
  doSwitchCollabVolunteer,
  doUpdatePassVolunteer,
} from "../slices/volunteerSlice";
import {
  requestCreateVolunteer,
  requestEditVolunteer,
  requestGetAllVolunteers,
  requestSwitchCollabVolunteer,
  requestUpdatePassVolunteer,
} from "../requests/volunteerRequest";
import { failMessages, successMessages } from "../../constances/messages";

export function* watchDoVolunteer() {
  yield takeLatest(doGetAllVolunteers.type, handleGetAllVolunteers);
  yield takeLatest(doCreateVolunteer.type, handleCreateVolunteer);
  yield takeLatest(doEditVolunteer.type, handleEditVolunteer);
  yield takeLatest(doUpdatePassVolunteer.type, handlePasswordVolunteer);
  yield takeLatest(doSwitchCollabVolunteer.type, handleCollabVolunteer);
}

export function* handleGetAllVolunteers(action) {
  try {
    const response = yield call(() => requestGetAllVolunteers());

    const { status } = response.data;

    if (status === "OK") {
      yield put(
        doneVolunteer({
          isOk: true,
          message: successMessages.GET_ALL_VOLUNTEERS,
          volunteerList: response.data.data,
        })
      );
    } else {
      yield put(
        doneVolunteer({
          isOk: false,
          message: failMessages.GET_ALL_VOLUNTEERS,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneVolunteer({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}

export function* handleCreateVolunteer(action) {
  try {
    const responseCreate = yield call(() =>
      requestCreateVolunteer(action.payload)
    );

    const { status } = responseCreate.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllVolunteers());

      yield put(
        doneVolunteer({
          isOk: true,
          message: successMessages.CREATE_NEW_VOLUNTEER,
          volunteerList: responseGetAll.data.data,
        })
      );
    } else {
      yield put(
        doneVolunteer({
          isOk: false,
          message: failMessages.CREATE_NEW_VOLUNTEER,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneVolunteer({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}

export function* handleEditVolunteer(action) {
  try {
    const responseEdit = yield call(() => requestEditVolunteer(action.payload));

    const { status } = responseEdit.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllVolunteers());

      yield put(
        doneVolunteer({
          isOk: true,
          message: successMessages.EDIT_NEW_VOLUNTEER,
          volunteerList: responseGetAll.data.data,
        })
      );
    } else {
      yield put(
        doneVolunteer({
          isOk: false,
          message: failMessages.EDIT_NEW_VOLUNTEER,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneVolunteer({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}

export function* handlePasswordVolunteer(action) {
  try {
    const responsePass = yield call(() =>
      requestUpdatePassVolunteer(action.payload)
    );

    const { status } = responsePass.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllVolunteers());

      yield put(
        doneVolunteer({
          isOk: true,
          message: successMessages.UPDATE_PASSWORD_VOLUNTEER,
          volunteerList: responseGetAll.data.data,
        })
      );
    } else {
      yield put(
        doneVolunteer({
          isOk: false,
          message: failMessages.UPDATE_PASSWORD_VOLUNTEER,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneVolunteer({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}

export function* handleCollabVolunteer(action) {
  console.log(action.payload);

  try {
    const responseCollab = yield call(() =>
      requestSwitchCollabVolunteer(action.payload)
    );

    const { status } = responseCollab.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllVolunteers());

      yield put(
        doneVolunteer({
          isOk: true,
          message: successMessages.SWITCH_COLLAB_VOLUNTEER,
          volunteerList: responseGetAll.data.data,
        })
      );
    } else {
      yield put(
        doneVolunteer({
          isOk: false,
          message: failMessages.SWITCH_COLLAB_VOLUNTEER,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneVolunteer({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}
