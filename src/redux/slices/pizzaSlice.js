import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchPizzas.pending, state => {
        state.items = [];
        state.status = 'loading';
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, state => {
        state.items = [];
        state.status = 'error';
      });
  },
});

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async ({ order, sortBy, categoryId, searchValue, currentPage }) => {
    const { data } = await axios.get(
      `http://localhost:3001/items?_page=${currentPage}&_limit=4&${
        categoryId ? `category=${categoryId}` : ''
      }&_sort=${sortBy}&_order=${order}&title_like=${searchValue}`
    );
    return data;
  }
);

export const selectPizzaData = state => state.pizza

export default pizzaSlice.reducer;
