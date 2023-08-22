import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import { Chain, useAccount, useDisconnect, useNetwork } from 'wagmi';

import { WRAPPER_CLASSES } from '../../util';
import MobileMenu from '../MobileMenu';
import DesktopNavigation from './DesktopNavigation';
import Logo from './Logo';
import MobileNavigationToggle from './MobileNavigationToggle';
import WalletDisplay from './WalletDisplay';

function Container({ children }: { children: ReactNode }) {
  return (
    <header className="bg-breadgray-og-dark">
      <div className={clsx(WRAPPER_CLASSES, 'flex justify-between')}>
        {children}
      </div>
    </header>
  );
}

const getChainString = (
  chain:
    | (Chain & {
        unsupported?: boolean | undefined;
      })
    | undefined,
) => {
  if (chain === undefined) return 'No Network';
  if (chain.unsupported) return 'Unsupported';
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
