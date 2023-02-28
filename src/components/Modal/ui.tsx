import { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
  return (
    <section
      data-test="modal"
      className="fixed z-30 flex h-full min-h-screen w-full items-center justify-center bg-breadgray-200 bg-opacity-95 p-2 sm:p-6 md:h-auto"
    >
      {children}
    </section>
  );
}

export function Inner({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-full flex-col items-start overflow-y-auto rounded bg-breadgray-100 bg-opacity-100 px-2 py-14 sm:px-4 md:p-16">
      {children}
    </section>
  );
}

export function CloseModalButton({ handleClick }: { handleClick: () => void }) {
  return (
    <button
      type="button"
      className=" absolute right-0 top-0 p-4 text-sm  text-neutral-400 hover:text-neutral-200 md:text-base"
      onClick={handleClick}
    >
      X
    </button>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl leading-normal text-neutral-300 md:text-center">
      {children}
    </h2>
  );
}

export function Message({ children }: { children: ReactNode }) {
  return (
    <p className="mt-12 text-sm leading-normal text-neutral-300 md:text-center">
      {children}
    </p>
  );
}
