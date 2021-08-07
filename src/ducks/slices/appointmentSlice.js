import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isOk: undefined,
  message: undefined,
  appointmentList: undefined,
};

const examSlice = createSlice({
  name: "appointment",
  initialState: initState,
  reducers: {
    doGetAllAppointments() {},
    doGetAllAppointmentsByClinic() {},
    doCreateAppointment() {},
    doDeleteAppointment() {},

    doneAppointment(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    resetAppointment() {
      return initState;
    },
  },
});

export const {
  doCreateAppointment,
  doGetAllAppointments,
  doneAppointment,
  resetAppointment,
  doDeleteAppointment,
  doGetAllAppointmentsByClinic,
} = examSlice.actions;

export default examSlice.reducer;
