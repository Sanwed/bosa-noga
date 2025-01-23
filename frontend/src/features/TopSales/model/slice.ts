import { State } from './types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../shared/types/product.ts';

const initialState: State = {
  products: [],
  loading: false,
  error: false,
};

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {
    sendTopSalesRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    sendTopSalesSuccess: (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.products = action.payload;
    },
    sendTopSalesFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { sendTopSalesRequest, sendTopSalesSuccess, sendTopSalesFailure } =
  topSalesSlice.actions;
export const topSalesReducer = topSalesSlice.reducer;
