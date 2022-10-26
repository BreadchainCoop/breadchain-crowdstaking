import { useAccount } from 'wagmi';
import { DesktopNavigation } from '../Navigation';
import Logo from './Logo';
import * as WalletDisplay from './WalletDisplay';
import { formatAddress } from '../../util';
import MobileNavigationToggle from './MobileNavigationToggle';

function Header() {
  const { address: accountAddress } = useAccount();

  return (
    <header className="bg-breadgray-100">
      <div className="max-w-6xl m-0 mx-auto p-6 md:px-8 flex h-24">
        <Logo />
        <DesktopNavigation />
        <WalletDisplay.Container>
          <WalletDisplay.Network />
          {accountAddress && (
            <WalletDisplay.Address>
              {formatAddress(accountAddress)}
            </WalletDisplay.Address>
          )}
        </WalletDisplay.Container>
        <MobileNavigationToggle />
      </div>
    </header>
  );
}

export default Header;
