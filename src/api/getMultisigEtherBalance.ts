import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";

import ERC20abi from "../ERC20.json";
import config from "../config";

const MULTISIG_ADDRESS = "0x6A148b997e6651237F2fCfc9E30330a6480519f0";

export const getMultisigEtherBalance = async (): // account: string,
// network: ENetwork
Promise<null | {
  balance: string;
}> => {
  // if (network === ENetwork.UNSUPPORTED) {
  //   console.error("Can't get balances on an unsupported network");
  //   return null;
  // }

  // const { ALCHEMY_ETH_URL, ALCHEMY_ETH_API_KEY } = config[network];

  const provider = new ethers.providers.JsonRpcProvider(
    `https://eth-mainnet.alchemyapi.io/v2/${
      import.meta.env.VITE_ALCHEMY_ETH_API_KEY
    }`
    // "https://polygon-mainnet.g.alchemy.com/v2/xkoKqq5hIQHfQIWBLBEs841-QxllCrK9"
  );
  // ALCHEMY_URL
  // ALCHEMY_API_KEY

  // const provider = new ethers.providers.Web3Provider(
  //   (window as any).ethereum,
  //   "any"
  // );

  // const { DAI } = config[network];

  // const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, provider);
  // const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, provider);

  const balance = await provider.getBalance(MULTISIG_ADDRESS);
  const etherBalance = ethers.utils.formatEther(balance);

  console.log("etherBalance: ", etherBalance);

  // let balance = await DAIcontract.balanceOf(MULTISIG_ADDRESS);

  // balance = ethers.utils.formatUnits(balance);

  // const BREADBalance = ethers.utils
  //   .formatUnits(BREADBal, BREAD.decimals)
  //   .toString();
  // const DAIBalance = ethers.utils.formatUnits(DAIBal, DAI.decimals).toString();
  // const EtherBalance = ethers.utils.formatEther(EtherBal);

  return {
    balance: etherBalance,
  };
};

export default getMultisigEtherBalance;
