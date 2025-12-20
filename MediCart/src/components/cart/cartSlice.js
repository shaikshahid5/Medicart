import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] // { product, qty }
  },
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find(
        (i) => i.product.id === action.payload.id
      );

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ product: action.payload, qty: 1 });
      }
    },

    incrementQty(state, action) {
      const item = state.items.find(
        (i) => i.product.id === action.payload
      );
      if (item) item.qty += 1;
    },

    decrementQty(state, action) {
      const item = state.items.find(
        (i) => i.product.id === action.payload
      );
      if (item && item.qty > 1) {
        item.qty -= 1;
      } else {
        state.items = state.items.filter(
          (i) => i.product.id !== action.payload
        );
      }
    }
  }
});

export const {
  addToCart,
  incrementQty,
  decrementQty
} = cartSlice.actions;

export default cartSlice.reducer;
