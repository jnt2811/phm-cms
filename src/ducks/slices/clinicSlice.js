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
    doUpdatePassClinic() {},
    doSwitchCollabClinic() {},

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
  doUpdatePassClinic,
  doSwitchCollabClinic,
  doneClinic,
  resetClinic,
} = clinicSlice.actions;

export default clinicSlice.reducer;
