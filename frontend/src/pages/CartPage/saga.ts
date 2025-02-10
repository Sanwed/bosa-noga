import { retry, spawn, put, takeLatest } from 'redux-saga/effects';
import { CartRequest } from '../../types/cart.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import { removeAllProducts, sendCartFailure, sendCartRequest, sendCartSuccess } from './slice.ts';

const sendCartData = async (body: CartRequest) => {
  await fetch(`${import.meta.env.VITE_API_URL}/order`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

function* handleFetch(action: PayloadAction<CartRequest>) {
  try {
    const body = action.payload;
    yield retry(3, 200, sendCartData, body);
    yield put(sendCartSuccess());
    yield put(removeAllProducts());
  } catch (error) {
    yield put(sendCartFailure());
  }
}

function* watchCart() {
  yield takeLatest(sendCartRequest.type, handleFetch);
}

export function* cartSaga() {
  yield spawn(watchCart);
}
