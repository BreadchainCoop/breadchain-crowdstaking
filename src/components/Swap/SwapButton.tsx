import React from "react";

type TProps = { onClick: () => void; from: string; disabled: boolean };

const SwapButton: React.FC<TProps> = ({ onClick, from, disabled }) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-8 py-4 flex justify-center items-center text-breadgray-200 button-gradient uppercase text-2xl"
      disabled={disabled}
    >
      {from === "BREAD" ? "Burn Bread" : "Mint Bread"}
    </button>
  );
};

export default SwapButton;
