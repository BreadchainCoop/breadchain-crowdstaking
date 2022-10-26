/* eslint-disable */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum EModalType {
  CONNECT_WALLET = 'CONNECT_WALLET',
  CHANGE_NETWORK = 'CHANGE_NETWORK',
  CHANGING_NETWORK = 'CHANGING_NETWORK',
  APPROVAL = 'APPROVAL',
  MINTING = 'MINTING',
  BURNING = 'BURNING',
}

export enum EModalStatus {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
}

export interface IModalState {
  type: null | EModalType;
  status: null | EModalStatus;
  title: null | string;
}

const initialState: IModalState = {
  type: null,
  status: null,
  title: null,
};

const ModalSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{ type: EModalType; title: string }>,
    ) {
      state.type = action.payload.type;
      state.status = EModalStatus.LOCKED;
      state.title = action.payload.title;
    },
    unlockModal(state) {
      state.status = EModalStatus.UNLOCKED;
    },
    closeModal(state) {
      state.type = null;
      state.status = null;
      state.title = null;
    },
  },
});

export default ModalSlice.reducer;
export const { openModal, unlockModal, closeModal } = ModalSlice.actions;
