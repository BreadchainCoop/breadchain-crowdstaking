import React from "react";
import Button from "../Button";

type TProps = { onClick: () => void; from: string; disabled: boolean };

const SwapButton: React.FC<TProps> = ({ onClick, from, disabled }) => {
  return (
    // <button className="w-full px-8 py-4 flex justify-center items-center text-breadgray-200 button-gradient uppercase text-xl sm:text-2xl">
    <Button onClick={onClick} disabled={disabled} variant="large" fullWidth>
      {from === "BREAD" ? "BURN BREAD" : "BAKE BREAD"}
    </Button>
    // </button>
  );
};

export default SwapButton;
