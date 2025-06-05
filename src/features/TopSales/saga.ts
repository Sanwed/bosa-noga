import { Product } from '../../types/product.ts';
import { retry, put, takeLatest, spawn } from 'redux-saga/effects';
import { sendTopSalesSuccess, sendTopSalesFailure, sendTopSalesRequest } from './slice.ts';
import { supabase } from '../../api/supabase.ts';

async function fetchTopSales() {
  const { data } = await supabase
    .from('products')
    .select(
      `
          *,
          product_images (image_url),
          product_sizes (size, available)
        `,
    )
    .eq('top_sales', true);

  return data as Product[];
}

function* handleFetch() {
  try {
    const response: Product[] = yield retry(3, 200, fetchTopSales);
    yield put(sendTopSalesSuccess(response));
  } catch (error) {
    console.error(error);
    yield put(sendTopSalesFailure());
  }
}

function* watchFetch() {
  yield takeLatest(sendTopSalesRequest.type, handleFetch);
}

export function* topSalesSaga() {
  yield spawn(watchFetch);
}
