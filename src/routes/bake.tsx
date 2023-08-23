import { Suspense, lazy } from 'react';

import BakeLayout from '../components/BakeLayout';

import ConnectWallet from '../components/ConnectWallet';
import UnsupportedNetwork from '../components/UnsupportedNetwork/UnsupportedNetwork';
import { useConnectedUser } from '../hooks/useConnectedUser';

const Swap = lazy(() => import('../components/Swap'));

export function Bake() {
  const { user } = useConnectedUser();

  if (!user) {
    return (
      <BakeLayout>
        <ConnectWallet />
      </BakeLayout>
    );
  }

  if (!user.isActiveChainSupported)
    return (
      <BakeLayout>
        <UnsupportedNetwork />
      </BakeLayout>
    );

  if (!user.config) throw new Error(`Missing chain config!`);

  return (
    <BakeLayout>
      <Suspense>
        <Swap chainConfig={user.config} accountAddress={user.address} />
      </Suspense>
    </BakeLayout>
  );
}

export default Bake;
