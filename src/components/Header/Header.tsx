import { ReactNode, useState } from 'react';
import {
  Chain, useAccount, useDisconnect, useNetwork,
} from 'wagmi';
import MobileMenu from '../MobileMenu';
import DesktopNavigation from './DesktopNavigation';
import Logo from './Logo';
import MobileNavigationToggle from './MobileNavigationToggle';
import WalletDisplay from './WalletDisplay';

function Container({ children }: { children: ReactNode }) {
  return (
    <header className="bg-breadgray-100">
      <div className="max-w-6xl m-0 mx-auto px-6 py-4 md:py-6 md:px-8 flex justify-between">
        {children}
      </div>
    </header>
  );
}

const getChainString = (chain: (Chain & {
  unsupported?: boolean | undefined;
}) | undefined) => {
  if (chain === undefined) return 'no network';
  if (chain.unsupported) return 'unsupported';
  return chain.name;
};

function Header() {
  const [isMobNavOpen, setIsMobNavOpen] = useState(false);
  const { address: accountAddress } = useAccount();
  const { chain } = useNetwork();

  const { disconnectAsync } = useDisconnect();

  const handleNavToggle = () => {
    setIsMobNavOpen(!isMobNavOpen);
  };

  const handleDisconnect = () => {
    disconnectAsync();
  };

  return (
    <Container>
      <Logo />
      <DesktopNavigation />
      <MobileMenu
        isOpen={isMobNavOpen}
        accountAddress={accountAddress}
        chainString={getChainString(chain)}
        handleDisconnect={handleDisconnect}
        handleNavToggle={handleNavToggle}
      />
      <WalletDisplay
        accountAddress={accountAddress}
        chainString={getChainString(chain)}
        handleDisconnect={handleDisconnect}
      />
      <MobileNavigationToggle handleClick={handleNavToggle} />
    </Container>

  );
}

export default Header;
