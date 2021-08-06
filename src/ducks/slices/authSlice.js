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
    doUpdateUserPass() {},

    doneAuth(state, action) {
      return action.payload;
    },

    resetAuth() {
      return initState;
    },

    doLogout() {},
  },
});

export const { doLogout, doLogin, doneAuth, resetAuth, doUpdateUserPass } =
  authSlice.actions;

export default authSlice.reducer;
