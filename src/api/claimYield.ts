import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";

import ERC20abi from "../ERC20.json";
import BREADabi from "../BreadPolygon.json";
import config from "../config";

export const claimYield = async (
  // account: string,
  network: ENetwork
): Promise<void> => {
  if (network === ENetwork.UNSUPPORTED) {
    console.error("Can't get balances on an unsupported network");
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

  await BREADcontract.claimYield();
};

export default claimYield;
