import { Product } from '../../../shared/types/product.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import { put, retry, spawn, takeLatest, select } from 'redux-saga/effects';
import {
  sendCatalogSuccess,
  sendCatalogFailure,
  sendCatalogRequest,
  changeOffset,
  sendCatalogLoadMore,
  setNewProducts,
} from './slice.ts';
import { selectOffset } from './selectors.ts';

const fetchProducts = async (categoryId: number, offset: number): Promise<Product[]> => {
  const categoryUrl = categoryId === 11 ? '' : `&categoryId=${categoryId}`;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/items${import.meta.env.VITE_RESPONSE_PREFIX}?offset=${offset}${categoryUrl}`);
  return await response.json();
};

function* handleFetch(action: PayloadAction<[number, boolean]>) {
  try {
    const [categoryId, loadMore] = action.payload;
    const offset: number = yield select(selectOffset);
    const response: Product[] = yield retry(3, 200, fetchProducts, categoryId, offset);

    if (loadMore) {
      yield put(sendCatalogLoadMore(response));
    } else {
      yield put(sendCatalogSuccess(response));
    }
    yield put(setNewProducts(response));
  } catch (error) {
    yield put(sendCatalogFailure());
  }
}

function* watchFetch() {
  yield takeLatest(sendCatalogRequest.type, handleFetch);
}

function* handleOffsetChange(action: PayloadAction<number>) {
  yield put(sendCatalogRequest([action.payload, true]));
}

function* watchOffsetChange() {
  yield takeLatest(changeOffset.type, handleOffsetChange);
}

export function* catalogSaga() {
  yield spawn(watchFetch);
  yield spawn(watchOffsetChange);
}
