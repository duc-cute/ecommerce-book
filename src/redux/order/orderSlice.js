/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

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
        if (
          carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity
        ) {
          carts[isExistIndex].quantity = carts[isExistIndex].detail.quantity;
        }
      } else {
        carts.push({
          quantity: item.quantity,
          _id: item._id,
          detail: item.detail,
        });
      }

      state.carts = carts;
      message.success("Thêm thành công sản phẩm vào giỏ hàng.");
    },
    doUpdateCartAction: (state, action) => {
      let carts = state.carts;
      const item = action.payload;

      let indexChange = carts.findIndex((p) => p._id === item._id);

      carts[indexChange].quantity = item.quantity;
      if (carts[indexChange].quantity > carts[indexChange].detail.quantity) {
        carts[indexChange].quantity = carts[indexChange].detail.quantity;
      }

      state.carts = carts;
    },
    doDeleteCartAction: (state, action) => {
      let carts = state.carts;
      const id = action.payload;

      carts = carts.filter((book) => book._id !== id);

      state.carts = carts;
      message.success("Xóa thành công đơn hàng khỏi giỏ hàng!");
    },
  },

  extraReducers: (builder) => {},
});

export const { doAddBookAction, doUpdateCartAction, doDeleteCartAction } =
  orderSlice.actions;

export default orderSlice.reducer;
