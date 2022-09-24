import { useNetwork } from "wagmi";
import config from "../config";
import { unlockModal } from "../features/modal/modalSlice";
import { ENetwork } from "../features/network/networkSlice";
import store from "../store";

export const watchAsset = async (
  network: ENetwork,
  tokenKey: "DAI" | "BREAD" | "DERIVATIVE"
) => {
  const { chain: activeChain } = useNetwork();
  if (!activeChain || activeChain.unsupported) return null;

  const ethereum = (window as any).ethereum;
  const { address, symbol, decimals } = config[activeChain.id][tokenKey];

  ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20", // Initially only supports ERC20, but eventually more!
      options: {
        address, // The address that the token is at.
        symbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals, // The number of decimals in the token
      },
    },
  });
};
