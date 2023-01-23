import { ReactNode } from 'react';

export function Inner({ children }: { children: ReactNode }) {
  return (
    <div className="m-auto flex w-full max-w-[425px] flex-col items-center px-3 pb-16 sm:max-w-[490px] sm:px-4 md:px-6">
      {children}
    </div>
  );
}
export function Main({ children }: { children: ReactNode }) {
  return <main className="w-full flex-grow">{children}</main>;
}
