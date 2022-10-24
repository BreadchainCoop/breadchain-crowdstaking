import { IProviderRpcError } from "@/metamaskErrorType";

import store from "../store";
import {
  closeModal,
  EModalType,
  openModal,
} from "../features/modal/modalSlice";

import { isAddress } from "ethers/lib/utils";
import {
  setTransactionComplete,
  setTransactionPending,
} from "../features/transaction/transactionSlice";
import { Contract, ethers, Signer } from "ethers";
import ERC20ABI from "../ERC20.json";
import { TToastDispatch } from "../context/ToastContext";

export const approveBREAD = async (
  signer: Signer,
  daiAddress: string,
  breadAddress: string,
  dispatch: typeof store.dispatch,
  dispatchToast: TToastDispatch
) => {
  if (!isAddress(breadAddress)) {
    return dispatchToast({
      type: "SET_TOAST",
      payload: {
        type: "ERROR",
        message: `Invalid spender address: ${breadAddress}`,
      },
    });
  }

  const dai = new Contract(daiAddress, ERC20ABI, signer);

  dispatch(
    openModal({ type: EModalType.APPROVAL, title: "Approving BREAD Contract" })
  );
  let txn;
  try {
    txn = await dai.approve(breadAddress, ethers.constants.MaxUint256);
  } catch (err) {
    const { message } = err as IProviderRpcError;
    dispatchToast({
      type: "SET_TOAST",
      payload: {
        type: "ERROR",
        message,
      },
    });
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

    dispatchToast({
      type: "SET_TOAST",
      payload: {
        type: "ERROR",
        message: "Approve transaction failed",
      },
    });
  }
};
