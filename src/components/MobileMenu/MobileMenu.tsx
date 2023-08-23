import clsx from 'clsx';

import MobileNavigation from './MobileNavigation';
import MobileWalletDisplay from './MobileWalletDisplay';

import Overlay from '../Overlay';

interface IProps {
  isOpen: boolean;
  accountAddress: string | undefined;
  chainString: string;
  handleDisconnect: () => void;
  handleNavToggle: () => void;
}

export function MobileMenu({
  isOpen,
  accountAddress,
  chainString,
  handleDisconnect,
  handleNavToggle,
}: IProps) {
  return (
    <>
      <Overlay closeMenu={() => handleNavToggle()} isOpen={isOpen} />
      <section
        className={clsx(
          'fixed right-0 top-0 z-20 flex h-screen w-auto transform flex-col gap-12  bg-breadgray-charcoal px-4 pl-12 pt-24 transition-transform md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <MobileWalletDisplay
          accountAddress={accountAddress}
          chainString={chainString}
          handleDisconnect={handleDisconnect}
        />
        <MobileNavigation handleNavToggle={handleNavToggle} />
      </section>
    </>
  );
}
export default MobileMenu;
