import { useAccount, useNetwork } from 'wagmi';
import config from '../config';
import * as Main from '../components/App/ui/Main';
import ConnectWalletButton from '../components/ConnectWalletButton';
import Swap from '../components/Swap';
import UnsupportedNetwork from '../components/UnsupportedNetwork/UnsupportedNetwork';

export function Bake() {
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

  if (activeChain.unsupported) return <UnsupportedNetwork />;
  if (!configuration) throw new Error(`Missing chainId ${activeChain.id} at config.ts`);

  return (
    <Main.Inner>
      <Swap chainConfig={configuration} accountAddress={accountAddress} />
    </Main.Inner>
  );
}

export default Bake;
