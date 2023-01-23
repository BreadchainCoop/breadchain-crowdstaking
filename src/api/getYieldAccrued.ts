import { BaseProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';

import BREADabi from '../BreadPolygon.json';
import config from '../config';

export const getYieldAccrued = async (
  provider: BaseProvider,
): Promise<null | {
  yieldAccrued: string;
}> => {
  const { BREAD } = config[provider.network.chainId];

  const BREADcontract = new ethers.Contract(
    BREAD.address,
    BREADabi.abi,
    provider,
  );

  const yieldAccrued = await BREADcontract.yieldAccrued();

  const yieldAccruedFormatted = ethers.utils.formatUnits(yieldAccrued);

  return {
    yieldAccrued: yieldAccruedFormatted,
  };
};

export default getYieldAccrued;
