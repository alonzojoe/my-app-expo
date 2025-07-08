import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.authUser = action.payload.user;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
