import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isOk: undefined,
  message: undefined,
  userData: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    doLogin() {},

    doneLogin(state, action) {
      return action.payload;
    },

    resetLogin() {
      return initState;
    },

    doLogout() {},
  },
});

export const { doLogout, doLogin, doneLogin, resetLogin } = authSlice.actions;

export default authSlice.reducer;
