import { useState, MouseEvent, ReactNode } from 'react';
import { classNames } from '../../util';

// import { classNames } from '@/util';

interface IProps {
  /* eslint-disable-next-line no-unused-vars */
  onClick: (event: MouseEvent) => void;
  disabled?: boolean;
  children: ReactNode;
  variant?: 'small' | 'regular' | 'large';
  fullWidth?: boolean;
  dataTest?: string;
}

const EVariants = {
  small: 'px-5 py-2 text-xs',
  regular: 'px-6 py-3 text-xs sm:text-sm',
  large: 'px-7 py-4 text-xl sm:text-2xl',
};

function Button({
  children,
  variant = 'regular',
  fullWidth = false,
  onClick,
  disabled = false,
  dataTest,
}: IProps) {
  const [mouseIsDown, setMouseIsDown] = useState(false);

  const handleMouseDown = () => {
    setMouseIsDown(true);
  };

  const handleMouseUp = () => {
    setMouseIsDown(false);
  };

  return (
    <button
      type="button"
      className={classNames(
        'relative flex items-center justify-center button-gradient button-shadow bg-opacity-85 text-neutral-900 hover:bg-opacity-100',
        EVariants[variant],
        fullWidth ? 'w-full' : '',
        mouseIsDown ? 'transform translate-y-1' : '',
      )}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      data-test={dataTest || ''}
    >
      <div className="absolute w-1 h-full left-0 transform -translate-x-1 bg-button-border" />
      <div className="absolute w-1 h-full right-0 transform translate-x-1 bg-button-border" />
      <div className="absolute w-full h-1 top-0 left-0 right-0 transform -translate-y-1 bg-button-border" />
      <div
        className={
          `absolute w-full h-1 bottom-0 left-0 right-0 transform translate-y-1 bg-button-border${mouseIsDown ? ' hidden' : ''}`
        }
      />
      {children}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
  variant: 'regular',
  fullWidth: false,
  dataTest: null,
};

export default Button;
