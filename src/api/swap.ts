import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";
// import BreadMainnet from "../BreadMainnet.json";
import BreadPolygon from "../BreadPolygon.json";
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
  receiverAddress: string,
  resetSwapState: () => void
) => {
  const { name, value } = from;

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
    network === ENetwork.POLYGON ? BreadPolygon.abi : BreadRinkeby.abi,
    signer
  );

  const amountWith18Decimals = ethers.utils.parseUnits(value, 18);

  let txn;
  try {
    if (name === "DAI") {
      dispatch(
        openModal({ type: EModalType.MINTING, title: `Baking ${value} BREAD` })
      );
      txn = await BREADcontract.mint(amountWith18Decimals, receiverAddress);
    }
    if (name === "BREAD") {
      dispatch(
        openModal({ type: EModalType.BURNING, title: `Burning ${value} BREAD` })
      );
      txn = await BREADcontract.burn(amountWith18Decimals, receiverAddress);
    }
  } catch (err: any) {
    console.error(err);
    dispatch(
      setToast({
        type: EToastType.ERROR,
        message: `${err.message} - ${err.data.message}`,
      })
    );
    dispatch(closeModal());
    return;
  }

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
