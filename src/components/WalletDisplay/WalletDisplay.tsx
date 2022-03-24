import React from "react";
import TextTransition from "../../transitions/TextTransition";

const WalletDisplay: React.FC = (props) => {
  const { children } = props;
  return (
    <span className="text-xs text-right inline-block w-48 truncate text-ellipsis">
      <TextTransition>{children}</TextTransition>
    </span>
  );
};

export default WalletDisplay;
