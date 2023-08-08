import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  cartItems: [],
  goodsAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.cartItems.find(item => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.cartItems.reduce((sum, obj) => obj.price * obj.count + sum, 0);
      state.goodsAmount = state.cartItems.reduce((sum, obj) => obj.count + sum, 0);
    },

    minusItem(state, action) {
      const findItem = state.cartItems.find(item => item.id === action.payload);
      findItem.count--;
      state.totalPrice = state.cartItems.reduce((sum, obj) => obj.price * obj.count + sum, 0);
      state.goodsAmount = state.cartItems.reduce((sum, obj) => obj.count + sum, 0);
    },

    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(obj => obj.id !== action.payload);
      state.totalPrice = state.cartItems.reduce((sum, obj) => obj.price * obj.count + sum, 0);
      state.goodsAmount = state.cartItems.reduce((sum, obj) => obj.count + sum, 0);
    },
    clearItems(state) {
      state.cartItems = [];
      state.goodsAmount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
