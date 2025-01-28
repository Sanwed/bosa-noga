import {RootState} from "../../../app/providers/StoreProvider/store.ts";

export const selectSearchValue = (state: RootState)=> state.catalogSearch.search;