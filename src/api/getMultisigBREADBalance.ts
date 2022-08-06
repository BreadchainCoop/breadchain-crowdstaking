import { ethers, providers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";

import ERC20abi from "../ERC20.json";
import config from "../config";
import { useValidatedWalletConnection } from "../hooks/useValidatedWalletConnection";

const MULTISIG_ADDRESS = "0x6A148b997e6651237F2fCfc9E30330a6480519f0";

export const getMultisigBREADBalance = async (
  provider: providers.BaseProvider
): Promise<null | {
  balance: string;
}> => {
  const { BREAD } = config[provider.network.chainId];

  const BREADcontract = new ethers.Contract(BREAD.address, ERC20abi, provider);

  let balance = await BREADcontract.balanceOf(MULTISIG_ADDRESS);

  balance = ethers.utils.formatUnits(balance);

  return {
    balance,
  };
};

export default getMultisigBREADBalance;
