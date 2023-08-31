import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type PizzaItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
  category: number
};


interface PizzaSliceState {
  items: PizzaItem[];
  status: Status
}

type FetchPizzasArgs = {
  order: string;
  sortBy: string;
  categoryId: number;
  searchValue: string;
  currentPage: number;
};

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchPizzas.pending, state => {
        state.items = [];
        state.status = Status.LOADING;
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, state => {
        state.items = [];
        state.status = Status.ERROR;
      });
  },
});

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async ({ order, sortBy, categoryId, searchValue, currentPage }: FetchPizzasArgs) => {
    const { data } = await axios.get<PizzaItem[]>(
      `http://localhost:3001/items?_page=${currentPage}&_limit=4&${
        categoryId ? `category=${categoryId}` : ''
      }&_sort=${sortBy}&_order=${order}&title_like=${searchValue}`
    );
    return data;
  }
);

export const selectPizzaData = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
