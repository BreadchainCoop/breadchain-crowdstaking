import config from "../config";

export const watchAsset = async (network: string, tokenKey: string) => {
  const ethereum = (window as any).ethereum;
  const { address, symbol, decimals } = config[network][tokenKey];
  const wasAdded = await ethereum.request({
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
  console.log(wasAdded);
};
