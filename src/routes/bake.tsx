import { Suspense, lazy } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import BakeLayout from '../components/BakeLayout';

import ConnectWallet from '../components/ConnectWallet';
import UnsupportedNetwork from '../components/UnsupportedNetwork/UnsupportedNetwork';
import config from '../config';

const Swap = lazy(() => import('../components/Swap'));

export function Bake() {
  const {
    isConnected,
    connector: activeConnector,
    address: accountAddress,
  } = useAccount();
  const { chain: activeChain } = useNetwork();

  const configuration =
    activeChain?.id && config[activeChain.id]
      ? config[activeChain.id]
      : undefined;

  if (!activeConnector || !activeChain || !accountAddress || !isConnected) {
    return (
      <BakeLayout>
        <ConnectWallet />
      </BakeLayout>
    );
  }

  if (activeChain.unsupported)
    return (
      <BakeLayout>
        <UnsupportedNetwork />
      </BakeLayout>
    );

  if (!configuration)
    throw new Error(`Missing chainId ${activeChain.id} at config.ts`);

  return (
    <BakeLayout>
      <Suspense>
        <Swap chainConfig={configuration} accountAddress={accountAddress} />
      </Suspense>
    </BakeLayout>
  );
}

export default Bake;
