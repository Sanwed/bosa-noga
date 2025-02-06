import {RootState} from "../../../app/providers/StoreProvider/store.ts";

export const selectCartData = (state: RootState) => state.cart;