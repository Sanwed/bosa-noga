import { all, fork } from 'redux-saga/effects';
import { topSalesSaga } from '../../../features/TopSales';
import { categoriesSaga } from '../../../shared/components/Categories';
import { catalogSaga } from '../../../features/Catalog';

export function* rootSaga() {
  yield all([fork(topSalesSaga), fork(categoriesSaga), fork(catalogSaga)]);
}
