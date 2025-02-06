import {CartProduct, CartRequest, State} from "./types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: State = {
  totalPrice: 0,
  totalCount: 0,
  products: [],
  loading: false,
  orderStatus: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const existingProductIndex = state.products.findIndex((product) => product.id === action.payload.id && product.size === action.payload.size);
      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].count += action.payload.count;
        if (state.products[existingProductIndex].count > 10) {
          state.products[existingProductIndex].count = 10;
        }
      } else {
        state.products.push(action.payload);
      }
      cartSlice.caseReducers.updateTotalPrice(state);
      cartSlice.caseReducers.updateTotalCount(state);
      saveStateToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex((product) => product.id === action.payload);
      if (index !== -1) {
        state.products.splice(index, 1);
        cartSlice.caseReducers.updateTotalPrice(state);
        cartSlice.caseReducers.updateTotalCount(state);
        saveStateToLocalStorage(state);
      }
    },
    updateTotalPrice: (state) => {
      state.totalPrice = state.products.reduce((sum, product) => sum + (product.price * product.count), 0);
    },
    updateTotalCount: (state) => {
      state.totalCount = state.products.reduce((count, product) => count + product.count, 0);
    },
    setCartState: (state, action: PayloadAction<State>) => {
      state.products = action.payload.products;
      state.totalPrice = action.payload.totalPrice;
      state.totalCount = action.payload.totalCount;
    },
    sendCartRequest: (state, action: PayloadAction<CartRequest>) => {
      state.loading = true;
      state.orderStatus = null;
    },
    sendCartSuccess: (state) => {
      state.loading = false;
      state.orderStatus = 'complete';
    },
    sendCartFailure: (state) => {
      state.loading = false;
      state.orderStatus = 'failed';
    },
    removeAllProducts: (state) => {
      state.products = [];
      cartSlice.caseReducers.updateTotalPrice(state);
      cartSlice.caseReducers.updateTotalCount(state);
      saveStateToLocalStorage(state);
    }
  }
})

const saveStateToLocalStorage = (state: State) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (e) {
    console.error("Error saving cart state to localStorage", e);
  }
};

export const {
  addToCart,
  removeFromCart,
  setCartState,
  sendCartSuccess,
  sendCartFailure,
  sendCartRequest,
  removeAllProducts,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;