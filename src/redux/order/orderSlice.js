/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

export const orderSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    doAddBookAction: (state, action) => {
      console.log("state", state.cart);
      let carts = state.carts;
      const item = action.payload;

      let isExistIndex = carts.findIndex((p) => p._id === item._id);

      if (isExistIndex > -1) {
        carts[isExistIndex].quantity =
          carts[isExistIndex].quantity + item.quantity;
        // if (
        //   carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity
        // ) {
        //   carts[isExistIndex].quantity = carts[isExistIndex].detail.quantity;
        // }
      } else {
        carts.push({
          quantity: item.quantity,
          _id: item._id,
          // detail: item.detail,
        });
      }

      state.carts = carts;
    },
  },

  extraReducers: (builder) => {},
});

export const { doAddBookAction } = orderSlice.actions;

export default orderSlice.reducer;
