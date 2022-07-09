import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";
import BREADabi from "../BreadPolygon.json";
import config from "../config";
import { useValidatedWalletConnection } from "../hooks/useValidatedWalletConnection";

export const getRewardsAccrued = async (
  // account: string,
  network: ENetwork
): Promise<null | {
  rewardsAccrued: string;
}> => {
  const { activeChain, activeConnector } = useValidatedWalletConnection();

  if (!activeChain || activeChain.unsupported || !activeConnector) return null;
  const provider = await activeConnector.getProvider();

  const { BREAD } = config[activeChain.id];

  const BREADcontract = new ethers.Contract(
    BREAD.address,
    BREADabi.abi,
    provider
  );
  // const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, provider);

  let rewardsAccrued = await BREADcontract.rewardsAccrued();
  console.log("rewardsAccrued raw value: ", rewardsAccrued);

  // const rewardsAccruedFormatted = ethers.utils.formatUnits(rewardsAccrued);

  // const BREADBalance = ethers.utils
  //   .formatUnits(BREADBal, BREAD.decimals)
  //   .toString();
  // const DAIBalance = ethers.utils.formatUnits(DAIBal, DAI.decimals).toString();
  // const MATICBalance = ethers.utils.formatEther(MATICBal);

  return {
    // rewardsAccrued: rewardsAccruedFormatted,
    rewardsAccrued,
  };
};

export default getRewardsAccrued;
