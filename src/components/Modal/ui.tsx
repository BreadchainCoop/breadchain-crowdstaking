import { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
  return (
    <section
      data-test="modal"
      className="fixed z-30 flex h-screen w-screen items-center justify-center bg-breadgray-200 bg-opacity-95 p-4"
    >
      {children}
    </section>
  );
}

export function Inner({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-y-auto rounded bg-breadgray-100 bg-opacity-100 p-6 py-8 md:p-12 md:py-16">
      {children}
    </section>
  );
}

export function CloseModalButton({ handleClick }: { handleClick: () => void }) {
  return (
    <button
      type="button"
      className="absolute right-0 top-0 p-6 text-sm text-neutral-500 hover:text-neutral-200 md:p-8"
      onClick={handleClick}
    >
      X
    </button>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return <h2 className="text-center text-2xl md:text-left">{children}</h2>;
}

export function Message({ children }: { children: ReactNode }) {
  return <p className="mt-12 text-center text-sm md:text-left">{children}</p>;
}
