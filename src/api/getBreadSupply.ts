import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";

import ERC20abi from "../ERC20.json";
import BREADabi from "../BreadPolygon.json";
import config from "../config";

export const getBreadSupply = async (
  // account: string,
  network: ENetwork
): Promise<null | {
  totalSupply: string;
}> => {
  if (network === ENetwork.UNSUPPORTED) {
    console.error("Can't get balances on an unsupported network");
    return null;
  }

  const { ALCHEMY_URL, ALCHEMY_API_KEY } = config[network];

  const provider = new ethers.providers.JsonRpcProvider(
    `${ALCHEMY_URL}${ALCHEMY_API_KEY}`
    // "https://polygon-mainnet.g.alchemy.com/v2/xkoKqq5hIQHfQIWBLBEs841-QxllCrK9"
  );
  // ALCHEMY_URL
  // ALCHEMY_API_KEY

  const { BREAD } = config[network];

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
