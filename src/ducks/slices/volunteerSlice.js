import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isOk: undefined,
  message: undefined,
  volunteerList: undefined,
};

const volunteerSlice = createSlice({
  name: "volunteer",
  initialState: initState,
  reducers: {
    doGetAllVolunteers() {},
    doCreateVolunteer() {},
    doEditVolunteer() {},
    doSwitchCollabVolunteer() {},
    doUpdateAuthVolunteer() {},
    doSearchVolunteer() {},
    doUpdateSchedule() {},

    doneVolunteer(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    resetVolunteer() {
      return initState;
    },
  },
});

export const {
  doGetAllVolunteers,
  doCreateVolunteer,
  doEditVolunteer,
  doUpdateAuthVolunteer,
  doSwitchCollabVolunteer,
  doneVolunteer,
  resetVolunteer,
  doSearchVolunteer,
  doUpdateSchedule,
} = volunteerSlice.actions;

export default volunteerSlice.reducer;
