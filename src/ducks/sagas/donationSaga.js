import { call, put, takeLatest } from "redux-saga/effects";
import {
  requestCreateDonation,
  requestGetAllDonations,
} from "../requests/donationRequest";
import {
  doCreateDonation,
  doGetAllDonations,
  doneDonation,
} from "../slices/donationSlice";
import { failMessages, successMessages } from "../../constances/messages";

export function* watchDoDonation() {
  yield takeLatest(doGetAllDonations.type, handleGetAllDonations);
  yield takeLatest(doCreateDonation.type, handleCreateDonation);
}

export function* handleGetAllDonations(action) {
  try {
    const response = yield call(() => requestGetAllDonations());

    const { status } = response.data;

    if (status === "OK") {
      yield put(
        doneDonation({
          isOk: true,
          message: successMessages.GET_ALL_DONATIONS,
          donationList: response.data.data,
        })
      );
    } else {
      yield put(
        doneDonation({
          isOk: false,
          message: failMessages.GET_ALL_DONATIONS,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneDonation({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}

export function* handleCreateDonation(action) {
  try {
    const responseCreate = yield call(() =>
      requestCreateDonation(action.payload)
    );

    const { status } = responseCreate.data;

    if (status === "OK") {
      const responseGetAll = yield call(() => requestGetAllDonations());

      yield put(
        doneDonation({
          isOk: true,
          message: successMessages.CREATE_NEW_DONATION,
          donationList: responseGetAll.data.data,
        })
      );
    } else {
      yield put(
        doneDonation({
          isOk: false,
          message: failMessages.CREATE_NEW_DONATION,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));

    yield put(
      doneDonation({
        isOk: false,
        message: JSON.stringify(error),
      })
    );
  }
}
