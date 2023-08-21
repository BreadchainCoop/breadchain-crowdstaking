import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAccount, useNetwork } from 'wagmi';
import config, { ChainConfiguration } from '../config';

export type TConnectedUserState = null | {
  address: `0x${string}`;
  config: ChainConfiguration;
};

const ConnectedUserContext = createContext<
  | {
      state: TConnectedUserState;
    }
  | undefined
>(undefined);

interface IConnectedUserProviderProps {
  children: ReactNode;
}

function ConnectedUserProvider({ children }: IConnectedUserProviderProps) {
  const [state, setState] = useState<TConnectedUserState>(null);

  const {
    isConnected,
    connector: activeConnector,
    address: accountAddress,
  } = useAccount();
  const { chain: activeChain } = useNetwork();

  useEffect(() => {
    const configuration =
      activeChain?.id && config[activeChain.id]
        ? config[activeChain.id]
        : undefined;
    if (
      activeConnector &&
      activeChain &&
      accountAddress &&
      isConnected &&
      configuration
    ) {
      setState({
        address: accountAddress,
        config: configuration,
      });
    }
    setState(null);
  }, [isConnected, activeConnector, accountAddress, activeChain]);

  const value = useMemo(() => ({ state }), [state]);

  return (
    <ConnectedUserContext.Provider value={value}>
      {children}
    </ConnectedUserContext.Provider>
  );
}

const useConnectedUser = () => {
  const context = useContext(ConnectedUserContext);
  if (context === undefined) {
    throw new Error(
      'useConnectedUser must be used within a ConnectedUserProvider',
    );
  }
  return context;
};

export { ConnectedUserProvider, useConnectedUser };
