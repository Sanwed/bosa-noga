import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  search: string;
  memoizedSearch: string;
}

const initialState: State = {
  search: '',
  memoizedSearch: '',
};

const catalogSearchSlice = createSlice({
  name: 'catalog-search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setMemoizedSearch: (state, action: PayloadAction<string>) => {
      state.memoizedSearch = action.payload;
    },
  },
});

export const { setSearch, setMemoizedSearch } = catalogSearchSlice.actions;
export const catalogSearchReducer = catalogSearchSlice.reducer;
