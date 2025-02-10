import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product.ts';

interface State {
  products: Product[];
  lastLoadedProducts: Product[];
  loading: boolean;
  error: boolean;
  offset: number;
}

const initialState: State = {
  products: [],
  lastLoadedProducts: [],
  loading: false,
  error: false,
  offset: 0,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    sendCatalogRequest: (state, action: PayloadAction<[number, boolean]>) => {
      state.loading = true;
      state.error = false;
      if (!action.payload[1]) {
        state.offset = 0;
      }
    },
    sendCatalogSuccess: (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.products = action.payload;
    },
    sendCatalogLoadMore: (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.products.push(...action.payload);
    },
    sendCatalogFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    setNewProducts: (state, action: PayloadAction<Product[]>) => {
      state.lastLoadedProducts = action.payload;
    },
    changeOffset(state) {
      state.offset = state.offset + 6;
    },
  },
});

export const {
  sendCatalogRequest,
  sendCatalogLoadMore,
  sendCatalogSuccess,
  sendCatalogFailure,
  setNewProducts,
  changeOffset,
} = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;
