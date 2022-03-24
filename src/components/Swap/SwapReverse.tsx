import React from "react";

type Props = {
  onClick: () => void;
};

const SwapReverse: React.FC<Props> = (props) => {
  return (
    <button
      className="inline-block my-4 p-2 rounded-full bg-breadgray-100"
      {...props}
    >
      <svg className="w-12 h-12" viewBox="0 0 24 24">
        {/* <path className="fill-current text-gray-200" d="M0 0h24v24H0z" /> */}
        <path
          className="fill-current text-gray-600"
          d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3 5 6.99h3V14h2V6.99h3L9 3z"
        />
      </svg>
    </button>
  );
};

export default SwapReverse;
