import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scannedQR: null,
  authUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.authUser = action.payload.user;
    },
    setScanQR(state, action) {
      state.scannedQR = action.payload.qr;
    },
  },
});

export const { setUser, setScanQR } = authSlice.actions;
export default authSlice.reducer;
