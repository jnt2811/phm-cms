import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isOk: undefined,
  message: undefined,
  donationList: undefined,
  donatorList: undefined,
};

const donationSlice = createSlice({
  name: "donation",
  initialState: initState,
  reducers: {
    doGetAllDonations() {},
    doGetAllDonators() {},
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
  doGetAllDonators,
} = donationSlice.actions;

export default donationSlice.reducer;
