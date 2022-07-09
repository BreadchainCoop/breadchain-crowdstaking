import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";

import BREADabi from "../BreadPolygon.json";
import config from "../config";
import { useValidatedWalletConnection } from "../hooks/useValidatedWalletConnection";

export const getBreadSupply = async (
  // account: string,
  network: ENetwork
): Promise<null | {
  totalSupply: string;
}> => {
  const { activeChain, activeConnector } = useValidatedWalletConnection();

  if (!activeChain || activeChain.unsupported || !activeConnector) return null;

  const { BREAD } = config[activeChain.id];
  const provider = await activeConnector.getProvider();

  const BREADcontract = new ethers.Contract(
    BREAD.address,
    BREADabi.abi,
    provider
  );
  // const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, provider);

  let totalSupply = await BREADcontract.totalSupply();

  totalSupply = ethers.utils.formatUnits(totalSupply);

  // const BREADBalance = ethers.utils
  //   .formatUnits(BREADBal, BREAD.decimals)
  //   .toString();
  // const DAIBalance = ethers.utils.formatUnits(DAIBal, DAI.decimals).toString();
  // const MATICBalance = ethers.utils.formatEther(MATICBal);

  return {
    totalSupply,
  };
};

export default getBreadSupply;
