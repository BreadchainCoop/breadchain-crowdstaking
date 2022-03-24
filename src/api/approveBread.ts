import { ethers } from "ethers";

import { ENetwork } from "../features/network/networkSlice";
import config from "../config";
import ERC20abi from "../ERC20.json";
import store from "../store";
import {
  closeModal,
  EModalType,
  openModal,
} from "../features/modal/modalSlice";
import {
  setApprovalPending,
  setApproved,
} from "../features/approval/approvalSlice";

export const approveBREAD = async (
  network: ENetwork,
  dispatch: typeof store.dispatch
) => {
  const { ethereum } = window as any;
  if (!ethereum) return;

  if (network === ENetwork.UNSUPPORTED) {
    console.error("Can't get balances on an unsupported network");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  // const { NETWORK_STRING, ETHERSCAN_API_KEY } = config[network];

  // const provider = new ethers.providers.EtherscanProvider(
  //   NETWORK_STRING,
  //   ETHERSCAN_API_KEY
  // );

  const { DAI, BREAD } = config[network];

  // const BREADcontract = new ethers.Contract(BREAD.address, ERC20abi, provider);
  const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, signer);

  dispatch(
    openModal({ type: EModalType.APPROVAL, title: "Approving BREAD Contract" })
  );
  let txn;
  try {
    txn = await DAIcontract.approve(BREAD.address, ethers.constants.MaxUint256);
  } catch (err) {
    console.log("approve() catch block");
    console.log(err);
    dispatch(closeModal());
    return;
  }
  dispatch(closeModal());
  dispatch(setApprovalPending());
  try {
    await txn.wait();
    dispatch(setApproved());
  } catch (err) {
    console.log(err);
  }
};
