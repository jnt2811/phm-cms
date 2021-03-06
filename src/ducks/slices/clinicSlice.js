import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isOk: undefined,
  message: undefined,
  clinicList: undefined,
};

const clinicSlice = createSlice({
  name: "clinic",
  initialState: initState,
  reducers: {
    doGetAllClinics() {},
    doCreateClinic() {},
    doEditClinic() {},
    doUpdateAuthClinic() {},
    doSwitchCollabClinic() {},
    doSearchClinic() {},

    doneClinic(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    resetClinic() {
      return initState;
    },
  },
});

export const {
  doGetAllClinics,
  doCreateClinic,
  doEditClinic,
  doUpdateAuthClinic,
  doSwitchCollabClinic,
  doneClinic,
  resetClinic,
  doSearchClinic,
} = clinicSlice.actions;

export default clinicSlice.reducer;
