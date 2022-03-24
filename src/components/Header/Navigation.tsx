import React from "react";
import { ENetwork } from "../../features/network/networkSlice";

import { appendClasses } from "../../transitions/NiceTransition";
import TextTransition from "../../transitions/TextTransition";

export const Nav: React.FC = (props) => {
  return (
    <nav className="flex flex-col items-end justify-center">
      {props.children}
    </nav>
  );
};

type TProps = {
  network: ENetwork;
};

export const Network: React.FC<TProps> = (props) => {
  const { network } = props;
  return (
    <span
      className={appendClasses(
        props,
        "text-xs text-center flex justify-center items-center mb-4 "
      )}
    >
      <TextTransition>
        {network
          ? (() => {
              if (network === ENetwork.RINKEBY) return "Rinkeby Testnet";
              if (network === ENetwork.MAINNET) return "Ethereum";
              if (network === ENetwork.UNSUPPORTED) return "Unsupported Chain";
              else {
                return "Invalid network state!";
              }
            })()
          : "Wallet Not Connected"}
      </TextTransition>
    </span>
  );
};
