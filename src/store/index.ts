import { configureStore } from '@reduxjs/toolkit';

import transactionSlice from '../features/transaction/transactionSlice';

const store = configureStore({
  reducer: {
    transaction: transactionSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
