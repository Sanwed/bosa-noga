import { combineReducers } from '@reduxjs/toolkit';
import { topSalesReducer } from '../../../features/TopSales';
import { categoriesReducer } from '../../../shared/components/Categories';
import { catalogReducer } from '../../../features/Catalog';

export const rootReducer = combineReducers({
  topSales: topSalesReducer,
  categories: categoriesReducer,
  catalog: catalogReducer,
});
