import { useAccount, useNetwork } from 'wagmi';
import * as Main from '../components/App/ui/Main';
import ConnectWalletButton from '../components/ConnectWalletButton';
import SiteTitle from '../components/SiteTitle/SiteTitle';
import Swap from '../components/Swap';
import UnsupportedNetwork from '../components/UnsupportedNetwork/UnsupportedNetwork';
import config from '../config';

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
      <>
        <SiteTitle />
        <Main.Inner>
          <ConnectWalletButton />
        </Main.Inner>
      </>
    );
  }

  if (activeChain.unsupported)
    return (
      <>
        <SiteTitle />
        <UnsupportedNetwork />
      </>
    );
  if (!configuration)
    throw new Error(`Missing chainId ${activeChain.id} at config.ts`);

  return (
    <>
      <SiteTitle />
      <Main.Inner>
        <Swap chainConfig={configuration} accountAddress={accountAddress} />
      </Main.Inner>
    </>
  );
}

export default Bake;
