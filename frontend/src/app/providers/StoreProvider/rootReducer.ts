import { combineReducers } from '@reduxjs/toolkit';
import { topSalesReducer } from '../../../features/TopSales';
import { categoriesReducer } from '../../../features/Categories';
import { catalogReducer } from '../../../features/Catalog';
import {catalogSearchReducer} from "../../../features/CatalogSearch";

export const rootReducer = combineReducers({
  topSales: topSalesReducer,
  categories: categoriesReducer,
  catalog: catalogReducer,
  catalogSearch: catalogSearchReducer,
});
