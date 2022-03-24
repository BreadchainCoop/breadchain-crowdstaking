import { ethers } from "ethers";

import { ENetwork } from "../features/network/networkSlice";
import config from "../config";
import ERC20abi from "../ERC20.json";

export const getAllowance = async (ownerAddress: string, network: ENetwork) => {
  if (network === ENetwork.UNSUPPORTED) {
    console.error("Can't get balances on an unsupported network");
    return null;
  }

  const { NETWORK_STRING, ETHERSCAN_API_KEY } = config[network];

  const provider = new ethers.providers.EtherscanProvider(
    NETWORK_STRING,
    ETHERSCAN_API_KEY
  );

  const { BREAD, DAI } = config[network];

  // const BREADcontract = new ethers.Contract(BREAD.address, ERC20abi, provider);
  const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, provider);

  const res = await DAIcontract.allowance(ownerAddress, BREAD.address);

  /**
   * !!!
   *
   * should we be using ethers.utils.formatUnits(BALANCE, DECIMALS)?
   * can decimals be hardcoded or pulled from ABI to save API calls?
   *
   * */
  const allowance = ethers.utils.formatUnits(res);
  return { value: parseInt(allowance) };
};
