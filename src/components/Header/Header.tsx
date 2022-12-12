import { ReactNode, useState } from 'react';
import { Chain, useAccount, useNetwork } from 'wagmi';
import { DesktopNavigation, MobileMenu } from '../Navigation';
import Logo from './Logo';
import MobileNavigationToggle from './MobileNavigationToggle';
import WalletDisplay from './WalletDisplay';

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
  if (chain === undefined) return 'no network';
  if (chain.unsupported) return 'unsupported';
  return chain.name;
};

function Header() {
  const [isMobNavOpen, setIsMobNavOpen] = useState(false);
  const { address: accountAddress } = useAccount();
  const { chain } = useNetwork();

  const handleClick = () => {
    setIsMobNavOpen(!isMobNavOpen);
  };

  return (
    <Container>
      <Logo />
      <DesktopNavigation />
      <MobileMenu isOpen={isMobNavOpen} />
      <WalletDisplay accountAddress={accountAddress} chainString={getChainString(chain)} />
      <MobileNavigationToggle handleClick={handleClick} />
    </Container>

  );
}

export default Header;
