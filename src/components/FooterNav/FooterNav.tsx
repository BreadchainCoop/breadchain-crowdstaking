import { ReactNode } from 'react';
import { useModal } from '../../hooks/ModalContext';
import ExternalNavLink from '../ExternalNavLink';

function FooterNavContainer({ children }: { children: ReactNode }) {
  return (
    <nav className="flex w-full flex-col items-center justify-between gap-6 sm:w-auto md:gap-10 md:px-4">
      {children}
    </nav>
  );
}

export default function FooterNav() {
  const { dispatch: dispatchModal } = useModal();

  function handleDisclaimerClick() {
    dispatchModal({
      type: 'SET_MODAL',
      payload: { type: 'DISCLAIMER', title: 'Disclaimer' },
    });
  }

  return (
    <FooterNavContainer>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row md:gap-6 lg:flex">
        <div className="md:w-1/2">
          <ExternalNavLink href="http://breadchain.xyz">
            homepage
          </ExternalNavLink>
        </div>
        <div className="md:w-1/2">
          <ExternalNavLink href="https://twitter.com/breadchain_">
            twitter
          </ExternalNavLink>
        </div>
        <ExternalNavLink href="https://cryptoleftists.xyz">
          <div className="flex flex-row items-center gap-4">discord</div>
        </ExternalNavLink>
        <ExternalNavLink href="https://github.com/BreadchainCoop">
          <div className="flex flex-row items-center gap-4">github</div>
        </ExternalNavLink>
        <ExternalNavLink href="https://guild.xyz/breadchain">
          <div className="flex flex-row items-center gap-4">guild</div>
        </ExternalNavLink>
        <button
          type="button"
          onClick={handleDisclaimerClick}
          className="px-3  text-sm text-neutral-400 hover:text-neutral-200 hover:underline"
        >
          <div className="flex flex-row items-center">disclaimer</div>
        </button>
      </div>
    </FooterNavContainer>
  );
}
