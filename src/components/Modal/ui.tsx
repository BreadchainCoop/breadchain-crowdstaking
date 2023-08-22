import { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
  return (
    <section
      data-test="modal"
      className="fixed z-30 flex h-full w-full items-center justify-center bg-breadgray-darkest bg-opacity-95 p-4"
    >
      {children}
      {/* <div className="flex h-full overflow-auto ">
      </div> */}
    </section>
  );
}

export function Inner({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex max-h-full flex-col items-start rounded bg-breadgray-og-dark bg-opacity-100 px-6 py-14 sm:px-8 md:p-16 md:px-12">
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
