import { all, fork } from "@redux-saga/core/effects";
import { watchDoAuth } from "./authSaga";
import { watchDoDonation } from "./donationSaga";
import { watchDoPet } from "./petSaga";
import { watchDoVolunteer } from "./volunteerSaga";
import { watchDoClinic } from "./clinicSaga";

export default function* rootSaga() {
  yield all([
    fork(watchDoAuth),
    fork(watchDoVolunteer),
    fork(watchDoDonation),
    fork(watchDoPet),
    fork(watchDoClinic),
  ]);
}
