import { retry, spawn, put, takeLatest } from 'redux-saga/effects';
import { CartRequest } from '../../types/cart.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import { removeAllProducts, sendCartFailure, sendCartRequest, sendCartSuccess } from './slice.ts';
import { supabase } from '../../api/supabase.ts';

export const sendCartData = async (body: CartRequest) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      phone: body.owner.phone,
      address: body.owner.address,
    })
    .select()
    .single();

  if (orderError) {
    throw new Error(`Ошибка при создании заказа: ${orderError.message}`);
  }

  const itemsToInsert = body.items.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    price: item.price,
    count: item.count,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(itemsToInsert);

  if (itemsError) {
    throw new Error(`Ошибка при добавлении товаров: ${itemsError.message}`);
  }

  return order;
};

function* handleFetch(action: PayloadAction<CartRequest>) {
  try {
    const body = action.payload;
    yield retry(3, 200, sendCartData, body);
    yield put(sendCartSuccess());
    yield put(removeAllProducts());
  } catch (error) {
    console.error(error);
    yield put(sendCartFailure());
  }
}

function* watchCart() {
  yield takeLatest(sendCartRequest.type, handleFetch);
}

export function* cartSaga() {
  yield spawn(watchCart);
}
