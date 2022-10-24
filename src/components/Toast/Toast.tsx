import React from 'react';

import { TToastType, useToast } from '../../context/ToastContext';

type TProps = {
  type: TToastType;
  message: string;
};

const ToastContainer: React.FC<React.PropsWithChildren<unknown>> = (props) => (
  <div className="p-4 w-full">
    <div className="px-6 py-8 md:px-12 max-w-2xl m-auto bg-breadgray-100 text-white relative">
      {props.children}
    </div>
  </div>
);

type TCloseProps = {
  onClick: () => void;
};

const CloseButton: React.FC<React.PropsWithChildren<TCloseProps>> = (props) => (
  <button
    className="absolute right-0 top-0 w-12 h-12 p-2 text-neutral-700 hover:text-neutral-500"
    {...props}
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

const Toast: React.FC<React.PropsWithChildren<TProps>> = (props) => {
  const { dispatch: toastDispatch } = useToast();
  const ref = React.useRef(null);
  const handleCloseToast = () => {
    toastDispatch({ type: 'CLEAR_TOAST' });
  };

  switch (props.type) {
    case 'ERROR':
      return (
        <div ref={ref} className="fixed z-10 bottom-0 w-full">
          <ToastContainer>
            <CloseButton onClick={handleCloseToast} />
            <h1 className="text-red-500 text-xl">Error</h1>
            <p className="text-xs leading-6 mt-4">{props.message}</p>
          </ToastContainer>
        </div>
      );
    default:
      throw new Error('Invalid Toast type!');
  }
};

export default Toast;
