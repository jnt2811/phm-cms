import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isOk: undefined,
  message: undefined,
  reportList: undefined,
};

const examSlice = createSlice({
  name: "report",
  initialState: initState,
  reducers: {
    doGetAllReports() {},
    doGetAllReportsByClinic() {},
    doCreateReport() {},

    doneReport(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    resetReport() {
      return initState;
    },
  },
});

export const {
  doCreateReport,
  doGetAllReports,
  doneReport,
  resetReport,
  doGetAllReportsByClinic,
} = examSlice.actions;

export default examSlice.reducer;
