import { ReactNode } from 'react';

interface IProps {
  handleClick: () => void;
  children: ReactNode;
}

function LinkButton({ children, handleClick }: IProps) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-neutral-400 underline hover:text-neutral-300"
    >
      {children}
    </button>
  );
}

export default LinkButton;
