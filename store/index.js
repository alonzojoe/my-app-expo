import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
