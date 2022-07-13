import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";

import ERC20abi from "../ERC20.json";
import BREADabi from "../BreadPolygon.json";
import config from "../config";

export const claimYield = async (
  // account: string,
  network: ENetwork
): Promise<any> => {
  if (network === ENetwork.UNSUPPORTED) {
    console.error("Can't get balances on an unsupported network");
  }
  const { ethereum } = window as any;
  if (!ethereum) return;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  // ALCHEMY_URL
  // ALCHEMY_API_KEY
  const { BREAD } = config[network];

  const BREADcontract = new ethers.Contract(
    BREAD.address,
    BREADabi.abi,
    signer
  );
  // const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, provider);

  const claimableYield = ethers.utils.formatUnits(
    await BREADcontract.yieldAccrued()
  );
  const tx = await BREADcontract.claimYield(
    ethers.utils.parseUnits(claimableYield, 18)
  );
  return tx;
};

export default claimYield;
