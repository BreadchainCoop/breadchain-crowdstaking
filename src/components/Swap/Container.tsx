import { ReactNode } from 'react';

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="m-auto flex w-full flex-col items-center px-3 py-16 sm:w-[460px] sm:px-4 md:px-6 lg:py-32">
      {children}
    </div>
  );
}

export default Container;
