import { ReactNode } from 'react';
import { Chain, useAccount, useNetwork } from 'wagmi';
import { DesktopNavigation } from '../Navigation';
import Logo from './Logo';
import WalletDisplay from './WalletDisplay';

import MobileNavigationToggle from './MobileNavigationToggle';

function Container({ children }: { children: ReactNode }) {
  return (
    <header className="bg-breadgray-100">
      <div className="max-w-6xl m-0 mx-auto px-6 py-4 md:py-5 md:px-8 md:h-24 flex justify-between">
        {children}
      </div>
    </header>
  );
}

const getChainString = (chain: (Chain & {
  unsupported?: boolean | undefined;
}) | undefined) => {
  if (chain === undefined) return 'not connected';
  if (chain.unsupported) return 'unsupported';
  return chain.name;
};

function Header() {
  const { address: accountAddress } = useAccount();
  const { chain } = useNetwork();

  return (
    <Container>
      <Logo />
      <DesktopNavigation />
      <WalletDisplay accountAddress={accountAddress} chainString={getChainString(chain)} />
      <MobileNavigationToggle />
    </Container>

  );
}

export default Header;
