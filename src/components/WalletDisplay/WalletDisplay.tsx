import React from "react";
import TextTransition from "../../transitions/TextTransition";

const WalletDisplay: React.FC = (props) => {
  const { children } = props;

  return (
    <span className="text-xs w-full flex justify-center md:justify-end mt-4 truncate text-ellipsis">
      <TextTransition>{children}</TextTransition>
    </span>
  );
};

export default WalletDisplay;
