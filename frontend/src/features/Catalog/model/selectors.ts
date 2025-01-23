import { RootState } from '../../../app/providers/StoreProvider/store.ts';

export const selectProducts = (state: RootState) => state.catalog;
export const selectOffset = (state: RootState) => state.catalog.offset;
