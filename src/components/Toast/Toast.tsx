import React from "react";
import { gsap } from "gsap";

import { clearToast, EToastType } from "../../features/toast/toastSlice";
import { useAppDispatch } from "../../store/hooks";

type TProps = {
  type: EToastType;
  message: string;
};

const ToastContainer: React.FC = (props) => {
  return (
    <div className="fixed bottom-0 p-8 w-full">
      <div className="py-8 px-12 max-w-2xl m-auto bg-breadgray-100 text-white relative">
        {props.children}
      </div>
    </div>
  );
};

type TCloseProps = {
  onClick: () => void;
};
const CloseButton: React.FC<TCloseProps> = (props) => {
  return (
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
};

const Toast: React.FC<TProps> = (props) => {
  const dispatch = useAppDispatch();
  const ref = React.useRef(null);
  const handleCloseToast = () => {
    gsap.to(ref.current, {
      duration: 0.1,
      opacity: 0,
      y: 50,
      ease: "back.in(1)",
      onComplete() {
        dispatch(clearToast());
      },
    });
  };

  React.useEffect(() => {
    gsap.from(ref.current, {
      duration: 0.4,
      opacity: 0,
      y: 50,
      ease: "back.out(1)",
    });
  }, []);

  switch (props.type) {
    case EToastType.ERROR:
      return (
        <div ref={ref} className="fixed bottom-0 w-full">
          <ToastContainer>
            <CloseButton onClick={handleCloseToast} />
            <h1 className="text-red-500 text-xl">Error</h1>
            <p className="text-xs leading-6 mt-4">{props.message}</p>
          </ToastContainer>
        </div>
      );
    default:
      throw new Error("Invalid Toast type!");
  }
};

export default Toast;
