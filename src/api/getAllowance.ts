import { ethers } from "ethers";

import { ENetwork } from "../features/network/networkSlice";
import config from "../config";
import ERC20abi from "../ERC20.json";
import store from "../store";
import { EToastType, setToast } from "../features/toast/toastSlice";
import { closeModal } from "../features/modal/modalSlice";
import { Chain, useNetwork, useSigner } from "wagmi";

export const getAllowance = async (
  tokenAddress: string,
  allower: string,
  spender: string,
  provider: ethers.providers.BaseProvider,
  dispatch: typeof store.dispatch
) => {
  const token = new ethers.Contract(tokenAddress, ERC20abi, provider);

  try {
    const res = await token.allowance(allower, spender);
    const allowance = ethers.utils.formatUnits(res);
    return { value: parseInt(allowance) };
  } catch (err: any) {
    console.log(err);
    const message = err.data ? err.data.message : err.message;

    dispatch(
      setToast({
        type: EToastType.ERROR,
        message,
      })
    );
    dispatch(closeModal());
    return;
  }
};
