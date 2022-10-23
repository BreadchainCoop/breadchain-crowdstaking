import { BigNumberish, Contract, Signer } from "ethers";
import store from "../store";
import {
  setTransactionComplete,
  setTransactionPending,
} from "../features/transaction/transactionSlice";
import { unlockModal } from "../features/modal/modalSlice";

import { parseEther } from "ethers/lib/utils";
import { abi as BreadABI } from "../BreadPolygon.json";
import { TToastDispatch } from "../context/ToastContext";
import { IProviderRpcError } from "../metamaskErrorType";

export const swapDaiForBread = async (
  signer: Signer,
  amount: BigNumberish,
  breadAddress: string,
  receiverAddress: string,
  dispatch: typeof store.dispatch,
  dispatchToast: TToastDispatch,
  resetSwapState: () => void
) => {
  if (typeof amount === "number") amount = parseEther(amount.toString());
  if (typeof amount === "string") amount = parseEther(amount);

  const bread = new Contract(breadAddress, BreadABI, signer);

  let txn;

  try {
    txn = await bread.mint(amount, receiverAddress);
  } catch (err) {
    const { message } = err as IProviderRpcError;
    dispatchToast({
      type: "SET_TOAST",
      payload: {
        type: "ERROR",
        message,
      },
    });
  }

  dispatch(setTransactionPending(txn.hash));
  dispatch(unlockModal());
  resetSwapState();
  try {
    await txn.wait();
  } catch (err: any) {
    console.error(err);

    dispatchToast({
      type: "SET_TOAST",
      payload: {
        type: "ERROR",
        message: "bake transaction failed",
      },
    });
  }
  dispatch(setTransactionComplete());
};
