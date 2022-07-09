import { ethers } from "ethers";

import { useValidatedWalletConnection } from "../hooks/useValidatedWalletConnection";

const MULTISIG_ADDRESS = "0x6A148b997e6651237F2fCfc9E30330a6480519f0";

export const getMultisigEtherBalance = async (): // account: string,
// network: ENetwork
Promise<null | {
  balance: string;
}> => {
  const { activeChain, activeConnector } = useValidatedWalletConnection();

  if (!activeChain || activeChain.unsupported || !activeConnector) return null;
  const provider = await activeConnector.getProvider();

  const balance = await provider.getBalance(MULTISIG_ADDRESS);
  const etherBalance = ethers.utils.formatEther(balance);

  return {
    balance: etherBalance,
  };
};

export default getMultisigEtherBalance;
