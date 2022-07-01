import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";

import ERC20abi from "../ERC20.json";
import config from "../config";
import { useNetwork, useProvider } from "wagmi";

const MULTISIG_ADDRESS = "0x6A148b997e6651237F2fCfc9E30330a6480519f0";

export const getMultisigEtherBalance = async (): // account: string,
// network: ENetwork
Promise<null | {
  balance: string;
}> => {
  const provider = useProvider();
  const { activeChain } = useNetwork();

  if (!activeChain || activeChain.unsupported) return null;

  const balance = await provider.getBalance(MULTISIG_ADDRESS);
  const etherBalance = ethers.utils.formatEther(balance);

  return {
    balance: etherBalance,
  };
};

export default getMultisigEtherBalance;
