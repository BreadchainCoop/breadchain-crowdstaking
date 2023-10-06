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

export type TConnectedUserState =
  | null
  | {
      address: `0x${string}`;
      config: ChainConfiguration | null;
      isActiveChainSupported: boolean;
    }
  | {
      address: `0x${string}`;
      config: ChainConfiguration | null;
      isActiveChainSupported: boolean;
    };

const ConnectedUserContext = createContext<{
  user: TConnectedUserState | null;
}>({ user: null });

interface IConnectedUserProviderProps {
  children: ReactNode;
}

function ConnectedUserProvider({ children }: IConnectedUserProviderProps) {
  const [user, setUser] = useState<TConnectedUserState>(null);

  const {
    isConnected,
    connector: activeConnector,
    address: accountAddress,
  } = useAccount();
  const { chain: activeChain } = useNetwork();

  useEffect(() => {
    const configuration =
      activeChain?.id && config[activeChain.id] ? config[activeChain.id] : null;

    if (activeConnector && activeChain && accountAddress && isConnected) {
      setUser({
        address: accountAddress,
        config: configuration,
        isActiveChainSupported: !activeChain.unsupported,
      });
    } else {
      setUser(null);
    }
  }, [isConnected, activeConnector, accountAddress, activeChain]);

  const value = useMemo(() => ({ user }), [user]);

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
