import { ReactNode } from 'react';

export function Container(
  { children }: {children: ReactNode},
) {
  return (
    <section
      data-test="modal"
      className="z-10 fixed h-screen w-screen bg-breadgray-200 bg-opacity-95 p-4 flex justify-center items-center"
    >
      {children}
    </section>
  );
}

export function Inner({ children }: {children: ReactNode}) {
  return (
    <section className="bg-neutral-900 bg-opacity-100 p-4 md:p-16 pt-14 rounded relative">
      {children}
    </section>
  );
}

export function Heading({ children }: {children: ReactNode}) {
  return (
    <h2 className="text-center md:text-left text-2xl">{children}</h2>
  );
}

export function Message({ children }: {children: ReactNode}) {
  return (
    <p className="text-center md:text-left text-sm mt-12">{children}</p>
  );
}
