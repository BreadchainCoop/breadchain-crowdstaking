import clsx from 'clsx';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  size?: '3' | '4' | '5' | '6';
}

export function IconContainer({ children, size }: IProps) {
  return (
    <span
      className={clsx(
        `flex items-center justify-center `,
        'another-class text-neutral-300',
        size === '3' ? 'h-3 w-3' : '',
        size === '4' ? 'h-4 w-4' : '',
        size === '5' ? 'h-5 w-5' : '',
        size === '6' ? 'h-6 w-6' : '',
      )}
    >
      {children}
    </span>
  );
}
IconContainer.defaultProps = {
  size: '6',
};

export default IconContainer;
