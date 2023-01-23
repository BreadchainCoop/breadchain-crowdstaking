import MobileNavigation from './MobileNavigation';
import MobileWalletDisplay from './MobileWalletDisplay';

import { classNames } from '../../util';

function Overlay({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={classNames(
        'z-9 fixed top-0 bottom-0 left-0 right-0 h-screen w-screen bg-neutral-900 opacity-0 transition-opacity',
        isOpen ? 'block opacity-70' : 'hidden',
      )}
    />
  );
}

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
