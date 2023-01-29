import { ReactNode } from 'react';

import { IconContainer, WalletIcon } from '../../Icons';
import WalletInfo from './WalletInfo';

export function Container({ children }: { children: ReactNode }) {
  return (
    <section className="hover: relative hidden flex-col items-end justify-center gap-2  md:flex">
      {children}
    </section>
  );
}

interface IProps {
  accountAddress: string | undefined;
  chainString: string;
  handleDisconnect: () => void;
}

function WalletDisplay({
  accountAddress,
  chainString,
  handleDisconnect,
}: IProps) {
  return (
    <Container>
      {accountAddress ? (
        <WalletInfo
          accountAddress={accountAddress}
          chainString={chainString}
          handleDisconnect={handleDisconnect}
        />
      ) : (
        <div className="flex items-center gap-3 text-xs">
          <IconContainer>
            <WalletIcon />
          </IconContainer>
          <span className="flex w-full items-center justify-center truncate text-ellipsis pt-0.5 pr-2 text-xs text-neutral-400  md:justify-end ">
            Not connected
          </span>
        </div>
      )}
    </Container>
  );
}

export default WalletDisplay;
