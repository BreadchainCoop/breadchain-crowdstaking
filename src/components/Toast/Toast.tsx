import React, { ReactNode } from 'react';

import { TToastType, useToast } from '../../context/ToastContext';

function ToastContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-full p-4">
      <div className="relative m-auto max-w-2xl bg-breadgray-100 px-6 py-8 text-white md:px-12">
        {children}
      </div>
    </div>
  );
}

type TCloseProps = {
  onClick: () => void;
};

function CloseButton({ onClick }: TCloseProps) {
  return (
    <button
      type="button"
      className="absolute right-0 top-0 h-12 w-12 p-2 text-neutral-700 hover:text-neutral-500"
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24">
        <path
          className="stroke-current"
          strokeLinecap="round"
          strokeWidth="1.5"
          d="m8.464 15.535 7.072-7.07M8.464 8.465l7.072 7.07"
        />
      </svg>
    </button>
  );
}

type TProps = {
  type: TToastType;
  message: string;
};

function Toast({ type, message }: TProps) {
  const { dispatch: toastDispatch } = useToast();
  const ref = React.useRef(null);
  const handleCloseToast = () => {
    toastDispatch({ type: 'CLEAR_TOAST' });
  };

  switch (type) {
    case 'ERROR':
      return (
        <div ref={ref} className="fixed bottom-0 z-10 w-full">
          <ToastContainer>
            <CloseButton onClick={handleCloseToast} />
            <h1 className="text-xl text-red-500">Error</h1>
            <p className="mt-4 break-words text-xs leading-6">{message}</p>
          </ToastContainer>
        </div>
      );

    default:
      throw new Error('Invalid Toast type!');
  }
}

export default Toast;
