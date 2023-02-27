import { ReactNode } from 'react';
import { useModal } from '../../context/ModalContext';
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

        {/* <span className="hidden px-2 text-neutral-700 md:inline">|</span> */}
        <div className="md:w-1/2">
          <ExternalNavLink href="https://twitter.com">
            {/* <IconContainer size="4">
              <TwitterIcon />
            </IconContainer> */}
            twitter
          </ExternalNavLink>
        </div>
        {/* <span className="hidden px-2 text-neutral-700 md:inline">|</span> */}
        <ExternalNavLink href="https://discord.com">
          <div className="flex flex-row items-center gap-4">
            {/* <IconContainer size="5">
              <DiscordIcon />
            </IconContainer> */}
            discord
          </div>
        </ExternalNavLink>
        {/* <span className="hidden px-2 text-neutral-700 md:inline">|</span> */}
        <ExternalNavLink href="https://guild.com">
          <div className="flex flex-row items-center gap-4">
            {/* <IconContainer size="5">
              <GithubIcon />
            </IconContainer> */}
            github
          </div>
        </ExternalNavLink>
        {/* <span className="hidden px-2 text-neutral-700 md:inline">|</span> */}
        <ExternalNavLink href="https://guild.com">
          <div className="flex flex-row items-center gap-4">
            {/* <IconContainer size="4">
              <GuildIcon />
            </IconContainer> */}
            guild
          </div>
        </ExternalNavLink>
        {/* <span className="hidden px-2 text-neutral-700 md:inline">|</span> */}
        <button
          type="button"
          onClick={handleDisclaimerClick}
          className="px-3  text-sm text-neutral-400 hover:text-neutral-200 hover:underline"
        >
          {/* <IconContainer size="5">
            <InfoIcon />
          </IconContainer> */}
          <div className="flex flex-row items-center">disclaimer</div>
        </button>
      </div>
    </FooterNavContainer>
  );
}
