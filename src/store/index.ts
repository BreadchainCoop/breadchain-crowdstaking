import { configureStore } from "@reduxjs/toolkit";

import walletSlice from "../features/wallet/walletSlice";
import networkSlice from "../features/network/networkSlice";
import modalSlice from "../features/modal/modalSlice"; // XXX
import fontSlice from "../features/font/fontSlice"; // XXX
import transactionSlice from "../features/transaction/transactionSlice"; // XXX
// import approvalSlice from "../features/approval/approvalSlice";

const store = configureStore({
  reducer: {
    wallet: walletSlice,
    network: networkSlice,
    modal: modalSlice,
    font: fontSlice,
    transaction: transactionSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
