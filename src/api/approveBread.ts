import { ethers } from "ethers";

import store from "../store";
import {
  closeModal,
  EModalType,
  openModal,
} from "../features/modal/modalSlice";
import { WriteContractConfig } from "@wagmi/core";
import { TransactionResponse } from "@ethersproject/providers";

import { EToastType, setToast } from "../features/toast/toastSlice";
import { isAddress } from "ethers/lib/utils";
import {
  setTransactionComplete,
  setTransactionPending,
} from "../features/transaction/transactionSlice";

export const approveBREAD = async (
  sendTx: (
    overrideConfig?: WriteContractConfig | undefined
  ) => Promise<TransactionResponse>,
  spenderAddress: string,
  dispatch: typeof store.dispatch
) => {
  if (!isAddress(spenderAddress)) {
    return dispatch(
      setToast({
        type: EToastType.ERROR,
        message: `Invalid spender address: ${spenderAddress}`,
      })
    );
  }

  dispatch(
    openModal({ type: EModalType.APPROVAL, title: "Approving BREAD Contract" })
  );
  let txn;
  try {
    txn = await sendTx({ args: [spenderAddress, ethers.constants.MaxUint256] });
  } catch (err) {
    // !!! handle this error
    dispatch(closeModal());
    return;
  }
  dispatch(closeModal());
  dispatch(setTransactionPending(txn.hash));
  try {
    await txn.wait();
    dispatch(setTransactionComplete());
  } catch (err) {
    console.error(err);
    dispatch(
      setToast({
        type: EToastType.ERROR,
        message: "Approve transaction failed",
      })
    );
  }
};
