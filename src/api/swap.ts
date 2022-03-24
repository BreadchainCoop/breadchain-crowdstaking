import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";
import BreadMainnet from "../BreadMainnet.json";
import BreadRinkeby from "../BreadRinkeby.json";
import config from "../config";
import store from "../store";
import {
  setTransactionComplete,
  setTransactionPending,
} from "../features/transaction/transactionSlice";
import {
  closeModal,
  EModalType,
  openModal,
  unlockModal,
} from "../features/modal/modalSlice";
import { EToastType, setToast } from "../features/toast/toastSlice";

export const swap = async (
  network: string,
  from: { name: string; value: string },
  dispatch: typeof store.dispatch,
  resetSwapState: () => void
) => {
  const { name, value } = from;
  console.log(value);

  const { ethereum } = window as any;
  if (!ethereum) return;

  if (network === ENetwork.UNSUPPORTED) {
    console.error("Can't get balances on an unsupported network");
    return null;
  }

  const { BREAD } = config[network];

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const BREADcontract = new ethers.Contract(
    BREAD.address,
    network === ENetwork.MAINNET ? BreadMainnet.abi : BreadRinkeby.abi,
    signer
  );

  const amountWith18Decimals = ethers.utils.parseUnits(value, 18);

  let txn;
  try {
    if (name === "DAI") {
      dispatch(
        openModal({ type: EModalType.MINTING, title: `Minting ${value} BREAD` })
      );
      txn = await BREADcontract.mint(amountWith18Decimals);
    }
    if (name === "BREAD") {
      dispatch(
        openModal({ type: EModalType.BURNING, title: `Burning ${value} BREAD` })
      );
      txn = await BREADcontract.burn(amountWith18Decimals);
    }
  } catch (err) {
    console.log("swap mint/burn() catch block");
    console.log(err);
    dispatch(closeModal());
    return;
  }

  dispatch(setTransactionPending(txn.hash));
  dispatch(unlockModal());
  resetSwapState();
  try {
    await txn.wait();
  } catch (err: any) {
    console.log(err);
    dispatch(
      setToast({
        type: EToastType.ERROR,
        message: "mint/burn transaction failed",
      })
    );
  }
  dispatch(setTransactionComplete());
};
