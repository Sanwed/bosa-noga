import {RootState} from "../../../app/providers/StoreProvider/store.ts";

export const selectHeaderSearchVisibility = (state: RootState) => state.headerSearch.isVisible;
export const selectHeaderSearchValue = (state: RootState) => state.headerSearch.searchValue;