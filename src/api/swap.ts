import { BigNumberish } from "ethers";
import store from "../store";
import {
  setTransactionComplete,
  setTransactionPending,
} from "../features/transaction/transactionSlice";
import { unlockModal } from "../features/modal/modalSlice";
import { EToastType, setToast } from "../features/toast/toastSlice";
import { WriteContractConfig } from "@wagmi/core";
import { TransactionResponse } from "@ethersproject/providers";
import { parseEther } from "ethers/lib/utils";

export const swap = async (
  sendTx: (
    overrideConfig?: WriteContractConfig | undefined
  ) => Promise<TransactionResponse>,
  amount: BigNumberish,
  dispatch: typeof store.dispatch,
  receiverAddress: string,
  resetSwapState: () => void
) => {
  if (typeof amount === "number") amount = parseEther(amount.toString());
  if (typeof amount === "string") amount = parseEther(amount);

  let txn = await sendTx({ args: [amount, receiverAddress] });

  /**
    !!!
    
    At this point the transaction has been successfully submitted.
    
    Does it make more sense to break this swap function into 2 
    separate funcitons?
  
  */

  dispatch(setTransactionPending(txn.hash));
  dispatch(unlockModal());
  resetSwapState();
  try {
    await txn.wait();
  } catch (err: any) {
    console.error(err);
    dispatch(
      setToast({
        type: EToastType.ERROR,
        message: "bake/burn transaction failed",
      })
    );
  }
  dispatch(setTransactionComplete());
};
