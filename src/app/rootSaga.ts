import { all, fork } from 'redux-saga/effects';
import { topSalesSaga } from '../features/TopSales';
import { categoriesSaga } from '../features/Categories';
import { catalogSaga } from '../features/Catalog';
import { productSaga } from '../pages/ProductPage/saga.ts';
import { cartSaga } from '../pages/CartPage';

export function* rootSaga() {
  yield all([
    fork(topSalesSaga),
    fork(categoriesSaga),
    fork(catalogSaga),
    fork(productSaga),
    fork(cartSaga),
  ]);
}
