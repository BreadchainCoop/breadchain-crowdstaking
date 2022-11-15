import { ReactNode } from 'react';

import { IconContainer, NetworkIcon } from '../Icons';
import { formatAddress } from '../../util';

export function Container(
  { children }: { children: ReactNode },
) {
  return (
    <section className="flex-col items-end justify-center gap-2 hidden md:flex">
      {children}
    </section>
  );
}

export function Row({
  children,
}: { children: ReactNode }) {
  return (
    <span className="text-xs text-center flex justify-center md:justify-end items-center gap-4">
      {children}
    </span>
  );
}

function WalletDisplay({
  accountAddress,
  chainString,
}: {
  accountAddress: string | undefined,
  chainString: string
}) {
  return (
    <Container>
      <Row>
        <IconContainer>
          <NetworkIcon />
        </IconContainer>
        <span>
          {chainString}
        </span>
      </Row>
      {accountAddress && (
        <Row>
          <span className="text-xs w-full flex items-center pt-0.5 justify-center md:justify-end truncate text-ellipsis">
            {formatAddress(accountAddress)}
          </span>
        </Row>
      )}
    </Container>
  );
}

export default WalletDisplay;
