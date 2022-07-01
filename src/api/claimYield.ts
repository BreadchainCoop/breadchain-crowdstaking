import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";

import ERC20abi from "../ERC20.json";
import BREADabi from "../BreadPolygon.json";
import config from "../config";
import { useNetwork, useSigner } from "wagmi";

export const claimYield = async (
  // account: string,
  network: ENetwork
): Promise<any> => {
  const { activeChain } = useNetwork();
  const { data: signer } = useSigner();
  if (!activeChain || activeChain.unsupported || !signer) return;

  const { BREAD } = config[activeChain.id];

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
