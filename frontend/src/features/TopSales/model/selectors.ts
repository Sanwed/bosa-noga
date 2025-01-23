import { RootState } from '../../../app/providers/StoreProvider/store.ts';

export const selectTopSales = (state: RootState) => state.topSales;
