import { configureStore } from "@reduxjs/toolkit";

import walletSlice from "../features/wallet/walletSlice";
import networkSlice from "../features/network/networkSlice";
import modalSlice from "../features/modal/modalSlice";
import fontSlice from "../features/font/fontSlice";
import transactionSlice from "../features/transaction/transactionSlice";
import approvalSlice from "../features/approval/approvalSlice";
import toastSlice from "../features/toast/toastSlice";

const store = configureStore({
  reducer: {
    wallet: walletSlice,
    network: networkSlice,
    modal: modalSlice,
    font: fontSlice,
    transaction: transactionSlice,
    approval: approvalSlice,
    toast: toastSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
