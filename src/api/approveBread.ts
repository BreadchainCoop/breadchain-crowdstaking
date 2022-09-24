import store from "../store";
import {
  closeModal,
  EModalType,
  openModal,
} from "../features/modal/modalSlice";
import {} from "@wagmi/core";

import { EToastType, setToast } from "../features/toast/toastSlice";
import { isAddress } from "ethers/lib/utils";
import {
  setTransactionComplete,
  setTransactionPending,
} from "../features/transaction/transactionSlice";
import { Contract, ethers, Signer } from "ethers";
import ERC20ABI from "../ERC20.json";

export const approveBREAD = async (
  signer: Signer,
  daiAddress: string,
  breadAddress: string,
  dispatch: typeof store.dispatch
) => {
  if (!isAddress(breadAddress)) {
    return dispatch(
      setToast({
        type: EToastType.ERROR,
        message: `Invalid spender address: ${breadAddress}`,
      })
    );
  }

  const dai = new Contract(daiAddress, ERC20ABI, signer);

  dispatch(
    openModal({ type: EModalType.APPROVAL, title: "Approving BREAD Contract" })
  );
  let txn;
  try {
    txn = await dai.approve(breadAddress, ethers.constants.MaxUint256);
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
