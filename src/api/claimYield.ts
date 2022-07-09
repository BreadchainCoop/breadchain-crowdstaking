import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";

import ERC20abi from "../ERC20.json";
import BREADabi from "../BreadPolygon.json";
import config from "../config";
import { useNetwork, useSigner } from "wagmi";

export const claimYield = async (
  signer: ethers.Signer,
  provider: ethers.providers.BaseProvider
): Promise<any> => {
  const { BREAD } = config[provider.network.chainId];

  const BREADcontract = new ethers.Contract(
    BREAD.address,
    BREADabi.abi,
    signer
  );

  const claimableYield = ethers.utils.formatUnits(
    await BREADcontract.yieldAccrued()
  );
  const tx = await BREADcontract.claimYield(
    ethers.utils.parseUnits(claimableYield, 18)
  );
  return tx;
};

export default claimYield;
