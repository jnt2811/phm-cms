import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isOk: undefined,
  message: undefined,
  petList: undefined,
};

const petSlice = createSlice({
  name: "pet",
  initialState: initState,
  reducers: {
    doGetAllPets() {},
    doGetAPet() {},
    doCreatePet() {},

    donePet(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    resetPet() {
      return initState;
    },
  },
});

export const { doCreatePet, doGetAllPets, donePet, resetPet, doGetAPet } =
  petSlice.actions;

export default petSlice.reducer;
