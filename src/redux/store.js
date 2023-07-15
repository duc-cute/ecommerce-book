/** @format */

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counter/counterSlice";
import doLoginReducer from "../redux/account/accountSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: doLoginReducer,
  },
});
