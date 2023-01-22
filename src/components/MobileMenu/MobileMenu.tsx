import MobileNavigation from './MobileNavigation';
import MobileWalletDisplay from './MobileWalletDisplay';

import { classNames } from '../../util';

function Overlay({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={classNames('fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-9 bg-neutral-900 opacity-0 transition-opacity', isOpen ? 'block opacity-70' : 'hidden')} />
  );
}

interface IProps {
  isOpen: boolean,
  accountAddress: string | undefined,
  chainString: string,
  handleDisconnect: () => void
}

export function MobileMenu({
  isOpen,
  accountAddress,
  chainString,
  handleDisconnect,
}: IProps) {
  return (
    <>
      <Overlay isOpen={isOpen} />
      <section className={classNames('fixed right-0 top-0 h-screen w-10/12 z-10 flex flex-col gap-12 bg-neutral-900 px-4  pt-24 transform translate-x-full transition-transform', isOpen ? 'translate-x-0' : '')}>
        <MobileWalletDisplay
          accountAddress={accountAddress}
          chainString={chainString}
          handleDisconnect={handleDisconnect}
        />
        <MobileNavigation />
      </section>
    </>
  );
}
export default MobileMenu;
