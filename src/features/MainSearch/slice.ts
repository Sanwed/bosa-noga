import { State } from './model/category.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  isVisible: boolean;
  searchValue: string;
}

const initialState: State = {
  isVisible: false,
  searchValue: '',
};

const mainSearchSlice = createSlice({
  name: 'mainSearch',
  initialState,
  reducers: {
    setVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setVisibility, setSearchValue } = mainSearchSlice.actions;
export const mainSearchReducer = mainSearchSlice.reducer;
