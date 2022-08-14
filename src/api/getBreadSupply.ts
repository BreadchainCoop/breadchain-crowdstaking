import { ethers } from "ethers";
import { BaseProvider } from "@ethersproject/providers";

import BREADabi from "../BreadPolygon.json";
import config from "../config";

export const getBreadSupply = async (
  provider: BaseProvider
): Promise<null | {
  totalSupply: string;
}> => {
  const { BREAD } = config[provider.network.chainId];

  const BREADcontract = new ethers.Contract(
    BREAD.address,
    BREADabi.abi,
    provider
  );

  let totalSupply = await BREADcontract.totalSupply();

  totalSupply = ethers.utils.formatUnits(totalSupply);

  return {
    totalSupply,
  };
};

export default getBreadSupply;
