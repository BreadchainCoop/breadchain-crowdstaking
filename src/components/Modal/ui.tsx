import { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
  return (
    <section
      data-test="modal"
      className="fixed z-10 flex h-screen w-screen items-center justify-center bg-breadgray-200 bg-opacity-95 p-4"
    >
      {children}
    </section>
  );
}

export function Inner({ children }: { children: ReactNode }) {
  return (
    <section className="relative rounded bg-neutral-900 bg-opacity-100 p-4 pt-14 md:p-16">
      {children}
    </section>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return <h2 className="text-center text-2xl md:text-left">{children}</h2>;
}

export function Message({ children }: { children: ReactNode }) {
  return <p className="mt-12 text-center text-sm md:text-left">{children}</p>;
}
