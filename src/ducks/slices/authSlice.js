import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    doLogout() {},
  },
});

export const { doLogout } = authSlice.actions;

export default authSlice.reducer;
