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
      activeChain?.id && config[activeChain.id]
        ? config[activeChain.id]
        : undefined;

    if (!activeConnector) {
      console.log('no activeConnector!');
    }
    if (!activeChain) {
      console.log('no activeChain!');
    }
    if (!accountAddress) {
      console.log('no accountAddress!');
    }
    if (!isConnected) {
      console.log('no isConnected!');
    }
    if (!configuration) {
      console.log('no configuration!');
    }

    if (
      // activeConnector &&
      // activeChain &&
      accountAddress &&
      isConnected &&
      configuration
    ) {
      setUser({
        address: accountAddress,
        config: configuration,
      });
    } else {
      setUser(null);
    }
  }, [isConnected, activeConnector, accountAddress, activeChain]);

  const value = useMemo(() => {
    console.log('\n\n\nhjook user', user);
    return { user };
  }, [user]);

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
