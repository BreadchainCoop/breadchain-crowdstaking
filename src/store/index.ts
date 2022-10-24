import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "../features/modal/modalSlice";
import transactionSlice from "../features/transaction/transactionSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    transaction: transactionSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
