import { call, put, takeLatest } from "redux-saga/effects";
import {
  requestCreateDonation,
  requestGetAllDonations,
  requestGetAllDonators,
  requestSearchDonation,
  requestSearchDonator,
} from "../requests/donationRequest";
import {
  doCreateDonation,
  doGetAllDonations,
  doGetAllDonators,
  doneDonation,
  doSearchDonation,
  doSearchDonator,
} from "../slices/donationSlice";
import { failMessages, successMessages } from "../../constances/messages";
import { isEmptyData } from "../../utils";

export function* watchDoDonation() {
  yield takeLatest(doGetAllDonations.type, handleGetAllDonations);
  yield takeLatest(doCreateDonation.type, handleCreateDonation);
  yield takeLatest(doGetAllDonators.type, handleGetAllDonators);
  yield takeLatest(doSearchDonation.type, handleSearchDonation);
  yield takeLatest(doSearchDonator.type, handleSearchDonator);
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

export function* handleGetAllDonators(action) {
  try {
    const response = yield call(() => requestGetAllDonators());

    const { status } = response.data;

    if (status === "OK") {
      yield put(
        doneDonation({
          isOk: true,
          message: successMessages.GET_ALL_DONATORS,
          donatorList: response.data.data,
        })
      );
    } else {
      yield put(
        doneDonation({
          isOk: false,
          message: failMessages.GET_ALL_DONATORS,
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

export function* handleSearchDonation(action) {
  try {
    const { search } = action.payload;

    if (!isEmptyData(search)) {
      const responseSearch = yield call(() =>
        requestSearchDonation(action.payload)
      );

      const { status } = responseSearch.data;

      if (status === "OK") {
        const { data } = responseSearch.data;

        yield put(
          doneDonation({
            isOk: true,
            message: successMessages.GET_ALL_DONATIONS,
            donationList: data,
          })
        );
      } else {
        yield put(
          doneDonation({
            isOk: false,
            message: failMessages.GET_ALL_DONATIONS,
            donationList: [],
          })
        );
      }
    } else {
      const response = yield call(() => requestGetAllDonations());

      const { status } = response.data;

      if (status === "OK") {
        const { data } = response.data;
        yield put(
          doneDonation({
            isOk: true,
            message: successMessages.GET_ALL_DONATIONS,
            donationList: data,
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

export function* handleSearchDonator(action) {
  try {
    const { search } = action.payload;

    if (!isEmptyData(search)) {
      const responseSearch = yield call(() =>
        requestSearchDonator(action.payload)
      );

      console.log(responseSearch.data);

      const { status } = responseSearch.data;

      if (status === "OK") {
        const { data } = responseSearch.data;
        yield put(
          doneDonation({
            isOk: true,
            message: successMessages.GET_ALL_DONATORS,
            donatorList: [data],
          })
        );
      } else {
        yield put(
          doneDonation({
            isOk: false,
            message: failMessages.GET_ALL_DONATORS,
            donatorList: [],
          })
        );
      }
    } else {
      const response = yield call(() => requestGetAllDonators());

      const { status } = response.data;

      if (status === "OK") {
        const { data } = response.data;
        yield put(
          doneDonation({
            isOk: true,
            message: successMessages.GET_ALL_DONATORS,
            donatorList: data,
          })
        );
      } else {
        yield put(
          doneDonation({
            isOk: false,
            message: failMessages.GET_ALL_DONATORS,
          })
        );
      }
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
