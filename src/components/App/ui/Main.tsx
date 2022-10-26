import { ReactNode } from 'react';

export function Inner({ children }: { children: ReactNode }) {
  return (
    <div className="m-auto w-full max-w-[490px] px-3 sm:px-4 py-16 md:px-6 flex flex-col items-center">
      {children}
    </div>
  );
}
export function Main({ children }: { children: ReactNode }) {
  return <main className="w-full flex-grow">{children}</main>;
}
