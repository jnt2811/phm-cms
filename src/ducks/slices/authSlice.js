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
    doUpdateUserInfo() {},
    doGetUserInfo() {},

    doneAuth(state, action) {
      return action.payload;
    },

    resetAuth() {
      return initState;
    },

    doLogout() {},
  },
});

export const {
  doLogout,
  doLogin,
  doneAuth,
  resetAuth,
  doUpdateUserInfo,
  doGetUserInfo,
} = authSlice.actions;

export default authSlice.reducer;
