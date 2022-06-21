import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";

import ERC20abi from "../ERC20.json";
import BREADabi from "../BreadPolygon.json";
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
    MATIC: {
      name: string;
      balance: string;
    };
  };
}> => {
  const { ALCHEMY_URL, ALCHEMY_API_KEY } = config[network];
  // const signer = provider.getSigner();

  // const { ALCHEMY_URL, ALCHEMY_API_KEY } = config[network];

  const provider = new ethers.providers.JsonRpcProvider(
    `${ALCHEMY_URL}${ALCHEMY_API_KEY}`
    // "https://polygon-mainnet.g.alchemy.com/v2/xkoKqq5hIQHfQIWBLBEs841-QxllCrK9"
  );

  if (network === ENetwork.UNSUPPORTED) {
    console.error("Can't get balances on an unsupported network");
    return null;
  }

  const { DAI, BREAD } = config[network];

  const BREADcontract = new ethers.Contract(
    BREAD.address,
    BREADabi.abi,
    provider
  );
  const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, provider);

  const [BREADBal, DAIBal, MATICBal] = await Promise.all([
    BREADcontract.balanceOf(account),
    DAIcontract.balanceOf(account),
    provider.getBalance(account),
  ]);

  const BREADBalance = ethers.utils
    .formatUnits(BREADBal, BREAD.decimals)
    .toString();
  const DAIBalance = ethers.utils.formatUnits(DAIBal, DAI.decimals).toString();
  const MATICBalance = ethers.utils.formatEther(MATICBal);

  return {
    tokens: {
      BREAD: {
        name: "BREAD",
        // balance: "0",
        balance: BREADBalance,
      },
      DAI: { name: "DAI", balance: DAIBalance },
      MATIC: {
        name: "MATIC",
        // balance: "0",
        balance: MATICBalance,
      },
    },
  };
};

export default getBalances;
