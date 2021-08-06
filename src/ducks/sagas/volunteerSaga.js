import { call, put, takeLatest } from "redux-saga/effects";
import {
  doCreateVolunteer,
  doEditVolunteer,
  doGetAllVolunteers,
  doneVolunteer,
  doSearchVolunteer,
  doSwitchCollabVolunteer,
  doUpdateAuthVolunteer,
  doUpdateSchedule,
} from "../slices/volunteerSlice";
import {
  requestCreateVolunteer,
  requestGetAllVolunteers,
  requestSearchVolunteer,
  requestUpdateSchedule,
  requestUpdateVolunteer,
} from "../requests/volunteerRequest";
import { failMessages, successMessages } from "../../constances/messages";
import { isEmptyData } from "../../utils";

export function* watchDoVolunteer() {
  yield takeLatest(doGetAllVolunteers.type, handleGetAllVolunteers);
  yield takeLatest(doCreateVolunteer.type, handleCreateVolunteer);
  yield takeLatest(doEditVolunteer.type, handleEditVolunteer);
  yield takeLatest(doUpdateAuthVolunteer.type, handleAuthVolunteer);
  yield takeLatest(doSwitchCollabVolunteer.type, handleCollabVolunteer);
  yield takeLatest(doSearchVolunteer.type, handleSearchVolunteer);
  yield takeLatest(doUpdateSchedule.type, handleUpdateSchedule);
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
    const responseEdit = yield call(() =>
      requestUpdateVolunteer(action.payload)
    );

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

export function* handleAuthVolunteer(action) {
  try {
    const responsePass = yield call(() =>
      requestUpdateVolunteer(action.payload)
    );

    const { status } = responsePass.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllVolunteers());

      yield put(
        doneVolunteer({
          isOk: true,
          message: successMessages.UPDATE_AUTH_VOLUNTEER,
          volunteerList: responseGetAll.data.data,
        })
      );
    } else {
      yield put(
        doneVolunteer({
          isOk: false,
          message: failMessages.UPDATE_AUTH_VOLUNTEER,
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
  try {
    const responseCollab = yield call(() =>
      requestUpdateVolunteer(action.payload)
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

export function* handleSearchVolunteer(action) {
  try {
    if (!isEmptyData(action.payload.phone)) {
      const responseSearch = yield call(() =>
        requestSearchVolunteer(action.payload)
      );

      const { status } = responseSearch.data;

      if (status === "OK") {
        const { data } = responseSearch.data;
        yield put(
          doneVolunteer({
            isOk: true,
            message: successMessages.GET_ALL_VOLUNTEERS,
            volunteerList: [data],
          })
        );
      } else {
        yield put(
          doneVolunteer({
            isOk: false,
            message: failMessages.GET_ALL_VOLUNTEERS,
            volunteerList: [],
          })
        );
      }
    } else {
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

export function* handleUpdateSchedule(action) {
  try {
    const { id, data } = action.payload;

    const responseSchedule = yield call(() => requestUpdateSchedule(id, data));

    const { status } = responseSchedule.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllVolunteers());

      yield put(
        doneVolunteer({
          isOk: true,
          message: successMessages.UPDATE_SCHEDULE_VOLUNTEER,
          volunteerList: responseGetAll.data.data,
        })
      );
    } else {
      yield put(
        doneVolunteer({
          isOk: false,
          message: failMessages.UPDATE_SCHEDULE_VOLUNTEER,
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
