import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isOk: undefined,
  message: undefined,
  donationList: undefined,
};

const donationSlice = createSlice({
  name: "donation",
  initialState: initState,
  reducers: {
    doGetAllDonations() {},
    doCreateDonation() {},

    doneDonation(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    resetDonation() {
      return initState;
    },
  },
});

export const {
  doCreateDonation,
  doGetAllDonations,
  doneDonation,
  resetDonation,
} = donationSlice.actions;

export default donationSlice.reducer;
