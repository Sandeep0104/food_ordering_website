// redux/Slices/CartSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.push({ ...action.payload, qty: 1 });
      }
    },
    remove: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    decreaseQty: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload);
      if (existingItem) {
        if (existingItem.qty > 1) {
          existingItem.qty -= 1;
        } else {
          return state.filter((item) => item.id !== action.payload);
        }
      }
    },
    clearCart: () => {
      return [];
    }
  }
});

export const { add, remove, decreaseQty, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
