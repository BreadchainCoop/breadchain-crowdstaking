import { countBy } from "lodash";
import { useAccount, useConnect, useSigner } from "wagmi";
import { useChainConfig } from "./useChainConfig";

export function useValidatedWalletConnection() {
  const {
    activeConnector,
    status: connectStatus,
    error: connectError,
  } = useConnect();
  const {
    data: accountData,
    status: accountStatus,
    error: accountError,
  } = useAccount();
  const {
    data: signerData,
    status: signerStatus,
    error: signerError,
  } = useSigner();
  const {
    configuration,
    unsupportedChain,
    activeChain,
    status: networkStatus,
    error: networkError,
  } = useChainConfig();

  let status: "error" | "idle" | "loading" | "success" = "loading";
  let error: Error | null = null;
  const stati = [connectStatus, accountStatus, signerStatus, networkStatus];

  if (
    connectStatus === "connected" &&
    accountStatus === "success" &&
    signerStatus === "success" &&
    !!activeChain
  )
    status = "success";

  if (stati.includes("error")) {
    status = "error";
    error = [connectError, accountError, signerError, networkError].reduce(
      (prev, error) => (!prev && !!error ? error : prev)
    );
  }

  if (!!activeChain && unsupportedChain) {
    status = "error";
    error = new Error(`Unsupported chain: ${activeChain.id}`);
  }

  return {
    activeConnector,
    connectStatus,
    accountData,
    accountStatus,
    signerData,
    configuration,
    unsupportedChain,
    activeChain,
    networkStatus,
    status,
    error,
  };
}
