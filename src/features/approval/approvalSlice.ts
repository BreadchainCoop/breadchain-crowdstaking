import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum EApprovalStatus {
  LOADING = "LOADING",
  NOT_APPROVED = "NOT_APPROVED",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
}

interface ApprovalState {
  status: null | EApprovalStatus;
}

const initialState: ApprovalState = {
  status: null,
};

const ApprovalSlice = createSlice({
  name: "Approval",
  initialState,
  reducers: {
    setApprovalLoading(state) {
      state.status = EApprovalStatus.LOADING;
    },
    setNotApproved(state) {
      state.status = EApprovalStatus.NOT_APPROVED;
    },
    setApprovalPending(state) {
      state.status = EApprovalStatus.PENDING;
    },
    setApproved(state) {
      state.status = EApprovalStatus.APPROVED;
    },
  },
});

export default ApprovalSlice.reducer;
export const {
  setApprovalLoading,
  setNotApproved,
  setApprovalPending,
  setApproved,
} = ApprovalSlice.actions;
