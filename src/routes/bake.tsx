import { Suspense, lazy } from 'react';

import BakeLayout from '../components/BakeLayout';

import ConnectWallet from '../components/ConnectWallet';
import Elipsis from '../components/Elipsis';
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

  if (!user.config)
    return (
      <BakeLayout>
        <UnsupportedNetwork />
      </BakeLayout>
    );

  return (
    <BakeLayout>
      <Suspense
        fallback={
          <p className="pt-16">
            loading
            <Elipsis />
          </p>
        }
      >
        <Swap chainConfig={user.config} accountAddress={user.address} />
      </Suspense>
    </BakeLayout>
  );
}

export default Bake;
