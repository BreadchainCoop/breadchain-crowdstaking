import { ethers, providers } from "ethers";
import BREADabi from "../BreadPolygon.json";
import config from "../config";

export const getRewardsAccrued = async (
  provider: providers.BaseProvider
): Promise<null | {
  rewardsAccrued: string;
}> => {
  const { BREAD } = config[provider.network.chainId];

  const BREADcontract = new ethers.Contract(
    BREAD.address,
    BREADabi.abi,
    provider
  );

  let rewardsAccrued = await BREADcontract.rewardsAccrued();
  console.log("rewardsAccrued raw value: ", rewardsAccrued);

  return {
    // rewardsAccrued: rewardsAccruedFormatted,
    rewardsAccrued,
  };
};

export default getRewardsAccrued;
