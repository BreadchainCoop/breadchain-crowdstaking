import { ReactNode } from 'react';

import { IconContainer, WalletIcon } from '../../Icons';
import WalletInfo from './WalletInfo';

export function Container(
  { children }: { children: ReactNode },
) {
  return (
    <section className="relative flex-col items-end justify-center gap-2 hidden md:flex">
      {children}
    </section>
  );
}

interface IProps {
  accountAddress: string | undefined,
  chainString: string
  handleDisconnect: () => void
}

function WalletDisplay({
  accountAddress,
  chainString,
  handleDisconnect,
}: IProps) {
  return (
    <Container>
      {/* <Row>
        <IconContainer>
          <NetworkIcon />
        </IconContainer>
        <span>
          {chainString}
        </span>
      </Row> */}
      {accountAddress ? (
        <WalletInfo
          accountAddress={accountAddress}
          chainString={chainString}
          handleDisconnect={handleDisconnect}
        />
      ) : (
        <div className="flex gap-3 text-xs items-center">
          <IconContainer>
            <WalletIcon />
          </IconContainer>
          Not connected
        </div>
      )}
    </Container>
  );
}

export default WalletDisplay;
