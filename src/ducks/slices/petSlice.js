import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isOk: undefined,
  message: undefined,
  petList: undefined,
  selectedReport: undefined,
};

const petSlice = createSlice({
  name: "pet",
  initialState: initState,
  reducers: {
    doGetAllPets() {},
    doGetPet() {},
    doCreatePet() {},
    doEditPet() {},
    doSearchPet() {},

    donePet(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    resetPet() {
      return initState;
    },

    setSelectedReport(state, action) {
      return {
        ...state,
        selectedReport: action.payload,
      };
    },
  },
});

export const {
  doCreatePet,
  doGetAllPets,
  donePet,
  resetPet,
  doGetPet,
  doSearchPet,
  doEditPet,
  setSelectedReport,
} = petSlice.actions;

export default petSlice.reducer;
