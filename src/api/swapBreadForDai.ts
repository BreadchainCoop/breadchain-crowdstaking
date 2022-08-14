import { BigNumberish, Contract, Signer } from "ethers";
import store from "../store";
import {
  setTransactionComplete,
  setTransactionPending,
} from "../features/transaction/transactionSlice";
import { unlockModal } from "../features/modal/modalSlice";
import { EToastType, setToast } from "../features/toast/toastSlice";
import { parseEther } from "ethers/lib/utils";
import { abi as BreadABI } from "../BreadPolygon.json";

export const swapBreadForDai = async (
  signer: Signer,
  amount: BigNumberish,
  breadAddress: string,
  receiverAddress: string,
  dispatch: typeof store.dispatch,
  resetSwapState: () => void
) => {
  if (typeof amount === "number") amount = parseEther(amount.toString());
  if (typeof amount === "string") amount = parseEther(amount);

  const bread = new Contract(breadAddress, BreadABI, signer);

  let txn = await bread.burn(amount, receiverAddress);

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
        message: "burn transaction failed",
      })
    );
  }
  dispatch(setTransactionComplete());
};
