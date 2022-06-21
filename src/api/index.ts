import { ethers } from "ethers";

import { ENetwork } from "../features/network/networkSlice";

export const requestAccount = async () => {
  const { ethereum } = window as any;
  return await ethereum.request({ method: "eth_requestAccounts" });
};

export const requestPermissions = async () => {
  const { ethereum } = window as any;
  return await ethereum.request({ method: "eth_requestPermissions" });
};

export const getAccount = async () => {
  const accounts = await requestAccount();
  // const permissions = await requestPermissions();
  if (!accounts.length) throw new Error("no accounts returned!");
  if (accounts.length === 1) {
    return accounts[0];
  }
  throw new Error("getAccount failed!");
};

export const getChainId = async () => {
  const { ethereum } = window as any;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const network = await provider.getNetwork();

  return network.chainId;
};

export const getNetwork = async (chainId = null) => {
  const id = chainId ? chainId : await getChainId();

  switch (id) {
    case 137:
      return ENetwork.POLYGON;
    case 80001:
      return ENetwork.MUMBAI;
    default:
      return ENetwork.UNSUPPORTED;
  }
};

export * from "./getAllowance";
export * from "./getBalances";
export * from "./ethInit";
