import {State} from "./types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: State = {
  isVisible: false,
  searchValue: "",
}

const headerSearchSlice = createSlice({
  name: 'headerSearch',
  initialState,
  reducers: {
    setVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  }
})

export const {setVisibility, setSearchValue} = headerSearchSlice.actions;
export const headerSearchReducer = headerSearchSlice.reducer;