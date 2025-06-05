import { Product } from '../../types/product.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import { put, retry, spawn, takeLatest, select } from 'redux-saga/effects';
import {
  sendCatalogSuccess,
  sendCatalogFailure,
  sendCatalogRequest,
  changeOffset,
  sendCatalogLoadMore,
  setNewProducts,
  sendCatalogLoadMoreFailure,
} from './slice.ts';
import { RootState } from '../../app/store.ts';
import { supabase } from '../../api/supabase';

const fetchProducts = async (
  categoryId: number,
  offset: number,
  searchValue: string,
): Promise<Product[]> => {
  const query = supabase
    .from('products')
    .select(
      `
        *,
        product_images (image_url),
        product_sizes (size, available)
      `,
    )
    .range(offset, offset + 5);

  if (categoryId !== 11) {
    query.eq('category', categoryId);
  }

  if (searchValue) {
    query.ilike('title', `%${searchValue}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data.map((product: any) => ({
    ...product,
    images: product.product_images?.map((img: any) => img.image_url) || [],
    sizes: product.product_sizes || [],
  })) as Product[];
};

function* handleFetch(action: PayloadAction<[number, boolean]>) {
  const [categoryId, loadMore] = action.payload;
  try {
    const searchValue: string = yield select((state: RootState) => state.catalogSearch.search);
    const offset: number = yield select((state: RootState) => state.catalog.offset);
    const response: Product[] = yield retry(3, 200, fetchProducts, categoryId, offset, searchValue);

    if (loadMore) {
      yield put(sendCatalogLoadMore(response));
    } else {
      yield put(sendCatalogSuccess(response));
    }
    yield put(setNewProducts(response));
  } catch (error) {
    console.error(error);
    if (loadMore) {
      yield put(sendCatalogLoadMoreFailure());
    } else {
      yield put(sendCatalogFailure());
    }
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
