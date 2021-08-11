import createSagaMiddleware from "@redux-saga/core";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import rootSaga from "./sagas/rootSaga";
import {
  appointmentSlice,
  authSlice,
  clinicSlice,
  donationSlice,
  petSlice,
  volunteerSlice,
  chatSlice,
} from "./slices";
import reportSlice from "./slices/reportSlice";

const reducer = combineReducers({
  auth: authSlice,
  volunteer: volunteerSlice,
  donation: donationSlice,
  pet: petSlice,
  clinic: clinicSlice,
  appointment: appointmentSlice,
  report: reportSlice,
  chat: chatSlice,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
