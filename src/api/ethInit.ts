import { getNetwork } from ".";
import { RootState, AppDispatch } from "../store";
import {
  setWalletAddress,
  clearBalances,
} from "../features/wallet/walletSlice";
import { clearTransaction } from "../features/transaction/transactionSlice";
("./index");

export const ethInit = async (appState: RootState, dispatch: AppDispatch) => {
  const ethereum = (window as any).ethereum;

  const network = await getNetwork();

  if (!network) {
    console.error("no network!!");
    return;
  }

  ethereum.on("accountsChanged", async (accounts: string[]) => {
    const account = accounts[0];
    localStorage.setItem(
      "storedAccount",
      JSON.stringify({ timestamp: Date.now(), account })
    );

    window.location.reload();
  });

  ethereum.on("chainChanged", () => {
    window.location.reload();
  });
};

export default ethInit;
