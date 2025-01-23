import { Category, State } from './types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: State = {
  categories: [{ id: 11, title: 'Все' }],
  loading: false,
  error: false,
  currentCategoryId: 11,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    sendCategoriesRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    sendCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
      state.loading = false;
      state.categories.push(...action.payload);
    },
    sendCategoriesFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    changeCurrentCategory: (state, action: PayloadAction<number>) => {
      state.currentCategoryId = action.payload;
    },
  },
});

export const {
  changeCurrentCategory,
  sendCategoriesRequest,
  sendCategoriesSuccess,
  sendCategoriesFailure,
} = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
