import { ReactNode } from 'react';
import { useModal } from '../../context/ModalContext';
import ExternalNavLink from '../ExternalNavLink';
import { IconContainer } from '../Icons';
import InfoIcon from '../Icons/InfoIcon';
import TwitterIcon from '../Icons/TwitterIcon';

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
      <div className="flex flex-col items-start gap-3 md:flex-row">
        <ExternalNavLink href="breadchain.xyz">
          <div className="flex flex-row items-center gap-4">
            <IconContainer size="4">
              <TwitterIcon />
            </IconContainer>
            breadchain.xyz
          </div>
        </ExternalNavLink>
        <span className="hidden px-2 text-neutral-700 md:inline">|</span>
        <ExternalNavLink href="/twitter.com">
          <div className="flex flex-row items-center gap-4">
            <IconContainer size="4">
              <TwitterIcon />
            </IconContainer>
            @breadchain_
          </div>
        </ExternalNavLink>
        <span className="hidden px-2 text-neutral-700 md:inline">|</span>
        <ExternalNavLink href="/discord.com">
          <div className="flex flex-row items-center gap-4">
            <IconContainer size="4">
              <TwitterIcon />
            </IconContainer>
            Discord
          </div>
        </ExternalNavLink>
        <span className="hidden px-2 text-neutral-700 md:inline">|</span>
        <ExternalNavLink href="/guild.com">
          <div className="flex flex-row items-center gap-4">
            <IconContainer size="4">
              <TwitterIcon />
            </IconContainer>
            Github
          </div>
        </ExternalNavLink>
        <span className="hidden px-2 text-neutral-700 md:inline">|</span>
        <ExternalNavLink href="/guild.com">
          <div className="flex flex-row items-center gap-4">
            <IconContainer size="4">
              <TwitterIcon />
            </IconContainer>
            Guild
          </div>
        </ExternalNavLink>
      </div>
      <div>
        <button
          type="button"
          onClick={handleDisclaimerClick}
          className="flex flex-row items-center gap-4 px-3 text-neutral-400 hover:text-neutral-200 hover:underline"
        >
          <IconContainer size="5">
            <InfoIcon />
          </IconContainer>
          Disclaimer
        </button>
      </div>
    </FooterNavContainer>
  );
}
