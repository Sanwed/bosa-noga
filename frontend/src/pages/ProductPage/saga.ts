import { spawn, retry, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { sendProductSuccess, sendProductFailure, sendProductRequest } from './slice.ts';

const fetchProduct = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/items/${id}`);
  return (await response.json()) as ProductAdvanced;
};

function* handleFetch(action: PayloadAction<string>) {
  try {
    const response: ProductAdvanced = yield retry(3, 200, fetchProduct, action.payload);
    yield put(sendProductSuccess(response));
  } catch (error) {
    yield put(sendProductFailure());
  }
}

function* watchFetch() {
  yield takeLatest(sendProductRequest.type, handleFetch);
}

export function* productSaga() {
  yield spawn(watchFetch);
}
