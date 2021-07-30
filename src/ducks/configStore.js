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
} from "./slices";

const reducer = combineReducers({
  auth: authSlice,
  volunteer: volunteerSlice,
  donation: donationSlice,
  pet: petSlice,
  clinic: clinicSlice,
  appointment: appointmentSlice,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
