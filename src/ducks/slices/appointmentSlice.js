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
} = examSlice.actions;

export default examSlice.reducer;
