import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  search: string;
}

const initialState: State = {
  search: '',
};

const catalogSearchSlice = createSlice({
  name: 'catalog-search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = catalogSearchSlice.actions;
export const catalogSearchReducer = catalogSearchSlice.reducer;
