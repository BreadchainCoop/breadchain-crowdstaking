import MobileNavigation from './MobileNavigation';
import MobileWalletDisplay from './MobileWalletDisplay';

import { classNames } from '../../util';
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
      <Overlay isOpen={isOpen} />
      <section
        className={classNames(
          'fixed right-0 top-0 z-10 flex h-screen w-10/12 translate-x-full transform flex-col gap-12  bg-neutral-900 px-4 pt-24 transition-transform',
          isOpen ? 'translate-x-0' : '',
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
