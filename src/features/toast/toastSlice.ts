import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum EToastType {
  ERROR,
}

export interface IToast {
  type: null | EToastType;
  message: null | string;
}

const initialState: IToast = {
  type: null,
  message: null,
};

const ToastSlice = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    setToast(state, action: PayloadAction<IToast>) {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearToast(state) {
      state.type = null;
      state.message = null;
    },
  },
});

export default ToastSlice.reducer;
export const { setToast, clearToast } = ToastSlice.actions;
