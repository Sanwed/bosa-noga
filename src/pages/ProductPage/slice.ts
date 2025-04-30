import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: State = {
  product: null,
  loading: false,
  error: false,
  chosenSize: null,
  count: 1,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    sendProductRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = false;
    },
    sendProductSuccess: (state, action: PayloadAction<ProductAdvanced>) => {
      state.loading = false;
      state.product = action.payload;
    },
    sendProductFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    chooseSize: (state, action: PayloadAction<string>) => {
      state.chosenSize = action.payload;
    },
    increaseCount: (state) => {
      if (state.count === 10) {
        return;
      }
      state.count += 1;
    },
    decreaseCount: (state) => {
      if (state.count === 1) {
        return;
      }
      state.count -= 1;
    },
    resetStore: () => initialState,
  },
});

export const {
  sendProductRequest,
  sendProductSuccess,
  sendProductFailure,
  chooseSize,
  decreaseCount,
  increaseCount,
  resetStore,
} = productSlice.actions;
export const productReducer = productSlice.reducer;
