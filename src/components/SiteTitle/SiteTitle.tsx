import React, { ReactNode } from 'react';

export function Title({ children }: { children: ReactNode }) {
  return (
    <div className="py-16 sm:py-32 flex flex-col text-center">
      {children}
    </div>
  );
}

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="uppercase text-2xl sm:text-5xl mb-1 md:mb-2">
      {children}
    </h1>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="uppercase text-1xl sm:text-2xl">{children}</h2>
  );
}
function SiteTitle() {
  return (
    <Title>
      <H1>BREADCHAIN</H1>
      <H2>Crowdstaking</H2>
    </Title>
  );
}

export default SiteTitle;
