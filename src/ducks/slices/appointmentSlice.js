import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isOk: undefined,
  message: undefined,
  examList: undefined,
};

const examSlice = createSlice({
  name: "exam",
  initialState: initState,
  reducers: {
    doGetAllExams() {},
    doCreateExam() {},

    doneExam(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    resetExam() {
      return initState;
    },
  },
});

export const { doCreateExam, doGetAllExams, doneExam, resetExam } =
  examSlice.actions;

export default examSlice.reducer;
