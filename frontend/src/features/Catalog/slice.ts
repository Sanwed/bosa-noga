import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product.ts';

interface State {
  products: Product[];
  lastLoadedProducts: Product[];
  loading: boolean;
  error: boolean;
  loadMoreError: boolean;
  offset: number;
  loaderTop?: boolean;
}

const initialState: State = {
  products: [],
  lastLoadedProducts: [],
  loading: false,
  error: false,
  offset: 0,
  loaderTop: true,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    sendCatalogRequest: (state, action: PayloadAction<[number, boolean]>) => {
      state.loading = true;
      state.error = false;
      state.loadMoreError = false;
      if (!action.payload[1]) {
        state.offset = 0;
        state.loaderTop = true;
      } else {
        state.loaderTop = false;
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
    sendCatalogLoadMoreFailure: (state) => {
      state.loading = false;
      state.loadMoreError = true;
    },
    sendCatalogFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    setNewProducts: (state, action: PayloadAction<Product[]>) => {
      state.lastLoadedProducts = action.payload;
    },
    changeOffset(state, action: PayloadAction<number>) {
      state.offset = state.offset + 6;
    },
  },
});

export const {
  sendCatalogRequest,
  sendCatalogLoadMore,
  sendCatalogSuccess,
  sendCatalogLoadMoreFailure,
  sendCatalogFailure,
  setNewProducts,
  changeOffset,
} = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;
