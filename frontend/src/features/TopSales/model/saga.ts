import { Product } from '../../../shared/types/product.ts';
import { retry, put, takeLatest, spawn } from 'redux-saga/effects';
import { sendTopSalesSuccess, sendTopSalesFailure, sendTopSalesRequest } from './slice.ts';

async function fetchTopSales(): Promise<Product[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/top-sales${import.meta.env.VITE_RESPONSE_PREFIX}`);
  return await response.json();
}

function* handleFetch() {
  try {
    const response: Product[] = yield retry(3, 200, fetchTopSales);
    yield put(sendTopSalesSuccess(response));
  } catch (error) {
    yield put(sendTopSalesFailure());
  }
}

function* watchFetch() {
  yield takeLatest(sendTopSalesRequest.type, handleFetch);
}

export function* topSalesSaga() {
  yield spawn(watchFetch);
}
