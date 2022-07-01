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
import { useNetwork, useSigner } from "wagmi";

export const approveBREAD = async (
  network: ENetwork,
  dispatch: typeof store.dispatch
) => {
  const { activeChain } = useNetwork();
  const { data: signer } = useSigner();
  if (!activeChain || activeChain.unsupported || !signer) return;

  const { DAI, BREAD } = config[activeChain.id];
  const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, signer);

  dispatch(
    openModal({ type: EModalType.APPROVAL, title: "Approving BREAD Contract" })
  );
  let txn;
  try {
    txn = await DAIcontract.approve(BREAD.address, ethers.constants.MaxUint256);
  } catch (err) {
    // !!! handle this error
    dispatch(closeModal());
    return;
  }
  dispatch(closeModal());
  dispatch(setApprovalPending());
  try {
    await txn.wait();
    dispatch(setApproved());
  } catch (err) {
    // !!! handle this error
  }
};
