import { retry, put, takeLatest, spawn } from 'redux-saga/effects';
import { sendCategoriesFailure, sendCategoriesRequest, sendCategoriesSuccess } from './slice.ts';
import { Category } from '../../types/category.ts';
import { supabase } from '../../api/supabase.ts';

async function fetchCategories() {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('id', { ascending: true });

  return data as Category[];
}

function* handleFetch() {
  try {
    const response: Category[] = yield retry(3, 200, fetchCategories);
    yield put(sendCategoriesSuccess(response));
  } catch (error) {
    console.error(error);
    yield put(sendCategoriesFailure());
  }
}

function* watchFetch() {
  yield takeLatest(sendCategoriesRequest.type, handleFetch);
}

export function* categoriesSaga() {
  yield spawn(watchFetch);
}
