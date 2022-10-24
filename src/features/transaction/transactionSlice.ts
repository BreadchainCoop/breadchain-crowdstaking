import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ETransactionStatus {
  PENDING = 'PENDING',
  COMPLETE = 'COMPLETE',
}

interface TransactionState {
  status: null | ETransactionStatus;
  hash: null | string;
}

const initialState: TransactionState = {
  status: null,
  hash: null,
};

const TransactionSlice = createSlice({
  name: 'Transaction',
  initialState,
  reducers: {
    setTransactionPending(state, action: PayloadAction<string>) {
      state.status = ETransactionStatus.PENDING;
      state.hash = action.payload;
    },
    setTransactionComplete(state) {
      state.status = ETransactionStatus.COMPLETE;
    },
    clearTransaction(state) {
      state.status = null;
      state.hash = null;
    },
  },
});

export default TransactionSlice.reducer;
export const {
  setTransactionPending,
  setTransactionComplete,
  clearTransaction,
} = TransactionSlice.actions;
