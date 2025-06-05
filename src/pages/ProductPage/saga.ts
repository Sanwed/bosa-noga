import { spawn, retry, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { sendProductSuccess, sendProductFailure, sendProductRequest } from './slice.ts';
import { ProductAdvanced } from '../../types/product.ts';
import { supabase } from '../../api/supabase.ts';

const fetchProduct = async (id: string) => {
  const { data } = await supabase
    .from('products')
    .select(
      `
        *,
        product_images (image_url),
        product_sizes (size, available)
      `,
    )
    .eq('id', id)
    .single();
  return data as ProductAdvanced;
};

function* handleFetch(action: PayloadAction<string>) {
  try {
    const response: ProductAdvanced = yield retry(3, 200, fetchProduct, action.payload);
    yield put(sendProductSuccess(response));
  } catch (error) {
    console.error(error);
    yield put(sendProductFailure());
  }
}

function* watchFetch() {
  yield takeLatest(sendProductRequest.type, handleFetch);
}

export function* productSaga() {
  yield spawn(watchFetch);
}
