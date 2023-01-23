import { ReactNode } from 'react';

type TProps = { children: ReactNode };

export function IconContainer({ children }: TProps) {
  return (
    <span className="flex h-6 w-6 items-center justify-center text-neutral-200">
      {children}
    </span>
  );
}

export default IconContainer;
