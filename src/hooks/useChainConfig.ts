import { useNetwork } from "wagmi";
import config, { ChainConfiguration, IConfig } from "../config";

export function useChainConfig() {
  const useNetworkResult = useNetwork();

  let configuration: ChainConfiguration | undefined;

  if (useNetworkResult.activeChain)
    configuration = config[useNetworkResult.activeChain.id];

  const unsupportedChain =
    useNetworkResult.activeChain?.unsupported ||
    (!useNetworkResult.activeChain?.unsupported && !configuration);
  return { configuration, unsupportedChain, ...useNetworkResult };
}
