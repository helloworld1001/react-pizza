import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { RootState } from '../store';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  cartItems: CartItem[];
}
const {cartItems, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
  cartItems,
  totalPrice,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.cartItems.find(item => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.cartItems);
    },

    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.cartItems.find(item => item.id === action.payload);
      findItem && findItem.count--;
      state.totalPrice = calcTotalPrice(state.cartItems);
    },

    removeItem(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(obj => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    clearItems(state) {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: number) => (state: RootState) => state.cart.cartItems.find(obj => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
