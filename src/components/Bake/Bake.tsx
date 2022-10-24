import React from 'react';
import { useAccount, useNetwork } from 'wagmi';
import config from '../../config';
import * as Main from '../App/ui/Main';
import ConnectWalletButton from '../ConnectWalletButton';
import Swap from '../Swap';

export const Bake: React.FC<React.PropsWithChildren<unknown>> = () => {
  const {
    isConnected,
    connector: activeConnector,
    address: accountAddress,
  } = useAccount();
  const { chain: activeChain } = useNetwork();

  const configuration = activeChain?.id && config[activeChain.id]
    ? config[activeChain.id]
    : undefined;

  if (!activeConnector || !activeChain || !accountAddress || !isConnected) {
    return (
      <Main.Inner>
        <ConnectWalletButton />
      </Main.Inner>
    );
  }

  if (activeChain.unsupported) return <>Unsupported network, please switch to a supported chain</>;
  if (!configuration) throw new Error(`Missing chainId ${activeChain.id} at config.ts`);

  return (
    <Main.Inner>
      <Swap chainConfig={configuration} accountAddress={accountAddress} />
    </Main.Inner>
  );
};

export default Bake;
