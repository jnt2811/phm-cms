import { createSlice } from "@reduxjs/toolkit";

const initState = {
  currentUser: undefined,
  userList: undefined,
  roomList: undefined,
  selectedRoom: undefined,
  messageList: undefined,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initState,
  reducers: {
    setCurrentuser(state, action) {
      return { ...state, currentUser: action.payload };
    },

    setUserList(state, action) {
      return { ...state, userList: action.payload };
    },

    setRoomListByUser(state, action) {
      return { ...state, roomList: action.payload };
    },

    setSelectedRoom(state, action) {
      return { ...state, selectedRoom: action.payload };
    },

    setMessageList(state, action) {
      return { ...state, messageList: JSON.parse(action.payload) };
    },
  },
});

export const {
  setSelectedRoom,
  setMessageList,
  setRoomListByUser,
  setUserList,
  setCurrentuser,
} = chatSlice.actions;

export default chatSlice.reducer;
