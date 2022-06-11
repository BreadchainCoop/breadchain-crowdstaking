import { ethers } from "ethers";

import { ENetwork } from "../features/network/networkSlice";
import config from "../config";
import ERC20abi from "../ERC20.json";
import store from "../store";
import { EToastType, setToast } from "../features/toast/toastSlice";
import { closeModal } from "../features/modal/modalSlice";

export const getAllowance = async (
  ownerAddress: string,
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
  // const signer = provider.getSigner();

  // const { ALCHEMY_URL, ALCHEMY_API_KEY } = config[network];

  // const provider = new ethers.providers.JsonRpcProvider(
  //   `${ALCHEMY_URL}${ALCHEMY_API_KEY}`
  //   // "https://polygon-mainnet.g.alchemy.com/v2/xkoKqq5hIQHfQIWBLBEs841-QxllCrK9"
  // );

  const { BREAD, DAI } = config[network];

  // const BREADcontract = new ethers.Contract(BREAD.address, ERC20abi, provider);
  const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, provider);
  try {
    const res = await DAIcontract.allowance(ownerAddress, BREAD.address);
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
