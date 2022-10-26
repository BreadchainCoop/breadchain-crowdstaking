import { ethers, providers } from 'ethers';
import BREADabi from '../BreadPolygon.json';
import config from '../config';

export const getRewardsAccrued = async (
  provider: providers.BaseProvider,
): Promise<null | {
  rewardsAccrued: string;
}> => {
  const { BREAD } = config[provider.network.chainId];

  const BREADcontract = new ethers.Contract(
    BREAD.address,
    BREADabi.abi,
    provider,
  );

  const rewardsAccrued = await BREADcontract.rewardsAccrued();

  return {
    // rewardsAccrued: rewardsAccruedFormatted,
    rewardsAccrued,
  };
};

export default getRewardsAccrued;
