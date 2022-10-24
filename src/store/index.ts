import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "../features/modal/modalSlice";
import fontSlice from "../features/font/fontSlice";
import transactionSlice from "../features/transaction/transactionSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    font: fontSlice,
    transaction: transactionSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
