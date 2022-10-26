import React, { ReactNode } from 'react';
import { useDisconnect, useNetwork } from 'wagmi';

import Button from '../Button';
import { IconContainer, NetworkIcon } from '../Icons';

export function Container(
  { children }: { children: ReactNode },
) {
  return (
    <section className="flex flex-col justify-center grow md:grow-0 mr-6 md:mr-0 gap-2">
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

export function Network() {
  const { chain: activeChain } = useNetwork();

  const { disconnectAsync } = useDisconnect();

  if (!activeChain) return null;

  return (
    <Row>
      <IconContainer>
        <NetworkIcon />
      </IconContainer>
      <span>
        {activeChain.unsupported && 'Unsupported network: '}
        {activeChain.name}
      </span>

      <Button variant="small" onClick={() => disconnectAsync()}>
        Disconnect
      </Button>
    </Row>
  );
}

export function Address({ children }: { children: ReactNode }) {
  return (
    <Row>
      <span className="text-xs w-full flex items-center pt-0.5 justify-center md:justify-start truncate text-ellipsis">
        {children}
      </span>
    </Row>
  );
}
