import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";

import ERC20abi from "../ERC20.json";
import config from "../config";

export const getBalances = async (
  account: string,
  network: ENetwork
): Promise<null | {
  tokens: {
    BREAD: {
      name: string;
      balance: string;
    };
    DAI: {
      name: string;
      balance: string;
    };
    ETH: {
      name: string;
      balance: string;
    };
  };
}> => {
  if (network === ENetwork.UNSUPPORTED) {
    console.error("Can't get balances on an unsupported network");
    return null;
  }

  const { NETWORK_STRING, ETHERSCAN_API_KEY } = config[network];

  const provider = new ethers.providers.EtherscanProvider(
    NETWORK_STRING,
    ETHERSCAN_API_KEY
  );

  const { DAI, BREAD } = config[network];

  const BREADcontract = new ethers.Contract(BREAD.address, ERC20abi, provider);
  const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, provider);

  const [BREADBal, DAIBal, ETHBal] = await Promise.all([
    BREADcontract.balanceOf(account),
    DAIcontract.balanceOf(account),
    provider.getBalance(account),
  ]);

  const BREADBalance = ethers.utils
    .formatUnits(BREADBal, BREAD.decimals)
    .toString();
  const DAIBalance = ethers.utils.formatUnits(DAIBal, DAI.decimals).toString();
  const ETHBalance = ethers.utils.formatEther(ETHBal);

  return {
    tokens: {
      BREAD: {
        name: "BREAD",
        balance: BREADBalance,
      },
      DAI: { name: "DAI", balance: DAIBalance },
      ETH: { name: "ETH", balance: ETHBalance },
    },
  };
};

export default getBalances;
