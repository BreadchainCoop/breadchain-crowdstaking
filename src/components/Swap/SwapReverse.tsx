import React from "react";

type Props = {
  onClick: () => void;
};

const SwapReverse: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <button
      className="inline-block my-4 p-3 rounded-full bg-breadgray-100 text-neutral-600 hover:text-neutral-500"
      {...props}
    >
      <svg className="w-7 h-7" fill="none" viewBox="0 0 123 105">
        <path className="fill-current" d="M37 0h50v60H37z" />
        <path
          className="fill-current "
          d="M61.5 105 8.24 45H114.76L61.5 105Z"
        />
      </svg>
    </button>
  );
};

export default SwapReverse;
