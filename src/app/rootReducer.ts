import { combineReducers } from '@reduxjs/toolkit';
import { topSalesReducer } from '../features/TopSales';
import { categoriesReducer } from '../features/Categories';
import { catalogReducer } from '../features/Catalog';
import { catalogSearchReducer } from '../features/CatalogSearch';
import { mainSearchReducer } from '../features/MainSearch';
import { productReducer } from '../pages/ProductPage';
import { cartReducer } from '../pages/CartPage';

export const rootReducer = combineReducers({
  topSales: topSalesReducer,
  categories: categoriesReducer,
  catalog: catalogReducer,
  catalogSearch: catalogSearchReducer,
  mainSearch: mainSearchReducer,
  product: productReducer,
  cart: cartReducer,
});
