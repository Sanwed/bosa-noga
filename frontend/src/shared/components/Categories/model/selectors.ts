import { RootState } from '../../../../app/providers/StoreProvider/store.ts';

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCurrentCategory = (state: RootState) => state.categories.currentCategoryId;
