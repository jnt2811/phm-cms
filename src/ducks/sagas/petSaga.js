import { call, put, takeLatest } from "redux-saga/effects";
import {
  requestCreatePet,
  requestGetAllPets,
  requestGetPet,
} from "../requests/petRequest";
import {
  doCreatePet,
  doGetAllPets,
  doGetPet,
  donePet,
} from "../slices/petSlice";
import { failMessages, successMessages } from "../../constances/messages";

export function* watchDoPet() {
  yield takeLatest(doGetAllPets.type, handleGetAllPets);
  yield takeLatest(doCreatePet.type, handleCreatePet);
  yield takeLatest(doGetPet.type, handleGetPet);
}

export function* handleGetAllPets(action) {
  try {
    const response = yield call(() => requestGetAllPets());

    const { status } = response.data;

    if (status === "OK") {
      yield put(
        donePet({
          isOk: true,
          message: successMessages.GET_ALL_PETS,
          petList: response.data.data,
        })
      );
    } else {
      yield put(
        donePet({
          isOk: false,
          message: failMessages.GET_ALL_PETS,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      donePet({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}

export function* handleGetPet(action) {
  try {
    const response = yield call(() => requestGetPet(action.payload));

    const { status } = response.data;

    if (status === "OK") {
      yield put(
        donePet({
          isOk: true,
          message: successMessages.GET_A_PET,
          petList: [response.data.data],
        })
      );
    } else {
      yield put(
        donePet({
          isOk: false,
          message: failMessages.GET_A_PET,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      donePet({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}

export function* handleCreatePet(action) {
  try {
    const responseCreate = yield call(() => requestCreatePet(action.payload));

    const { status } = responseCreate.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllPets());

      yield put(
        donePet({
          isOk: true,
          message: successMessages.CREATE_NEW_PET,
          petList: responseGetAll.data.data,
        })
      );
    } else {
      yield put(
        donePet({
          isOk: false,
          message: failMessages.CREATE_NEW_PET,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      donePet({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}
