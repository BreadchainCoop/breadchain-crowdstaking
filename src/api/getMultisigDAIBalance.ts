import { ethers, providers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";

import ERC20abi from "../ERC20.json";
import config from "../config";

const MULTISIG_ADDRESS = "0x6A148b997e6651237F2fCfc9E30330a6480519f0";

export const getMultisigDAIBalance = async (
  // account: string,
  provider: providers.BaseProvider
): Promise<null | {
  balance: string;
}> => {
  const { DAI } = config[provider.network.chainId];

  const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, provider);

  let balance = await DAIcontract.balanceOf(MULTISIG_ADDRESS);

  balance = ethers.utils.formatUnits(balance);

  return {
    balance,
  };
};

export default getMultisigDAIBalance;
