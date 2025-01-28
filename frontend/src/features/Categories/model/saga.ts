import { retry, put, takeLatest, spawn } from 'redux-saga/effects';
import { Category } from './types.ts';
import { sendCategoriesFailure, sendCategoriesRequest, sendCategoriesSuccess } from './slice.ts';

async function fetchTopSales(): Promise<Category[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/categories${import.meta.env.VITE_RESPONSE_PREFIX}`);
  return await response.json();
}

function* handleFetch() {
  try {
    const response: Category[] = yield retry(3, 200, fetchTopSales);
    yield put(sendCategoriesSuccess(response));
  } catch (error) {
    yield put(sendCategoriesFailure());
  }
}

function* watchFetch() {
  yield takeLatest(sendCategoriesRequest.type, handleFetch);
}

export function* categoriesSaga() {
  yield spawn(watchFetch);
}
