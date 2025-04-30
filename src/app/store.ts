import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer.ts';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga.ts';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
