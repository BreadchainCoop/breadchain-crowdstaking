import React from "react";
import { ENetwork } from "../../features/network/networkSlice";

import TextTransition from "../../transitions/TextTransition";
import { IconContainer, NetworkIcon } from "../Icons";

export const Container: React.FC = (props) => {
  return (
    <section className="flex flex-col justify-center grow md:grow-0 mr-6 md:mr-0 gap-2">
      {props.children}
    </section>
  );
};

export const Row: React.FC = ({ children }) => (
  <span className="text-xs text-center flex justify-center md:justify-end items-center gap-4">
    {children}
  </span>
);

type TProps = {
  network: null | ENetwork;
};

export const Network: React.FC<TProps> = (props) => {
  const { network } = props;
  return (
    <Row>
      {network
        ? (() => {
            if (network === ENetwork.RINKEBY)
              return (
                <>
                  <IconContainer>
                    <NetworkIcon />
                  </IconContainer>
                  <span>
                    <TextTransition>Rinkeby Testnet</TextTransition>
                  </span>
                </>
              );
            if (network === ENetwork.POLYGON)
              return (
                <>
                  <IconContainer>
                    <NetworkIcon />
                  </IconContainer>
                  <TextTransition>Polygon</TextTransition>
                </>
              );

            if (network === ENetwork.UNSUPPORTED) return "Unsupported Chain";
            else {
              return "Invalid network state!";
            }
          })()
        : "no network"}
    </Row>
  );
};

export const Address: React.FC = (props) => {
  const { children } = props;

  return (
    <Row>
      <span className="text-xs w-full flex items-center pt-0.5 justify-center md:justify-start truncate text-ellipsis">
        <TextTransition>{children}</TextTransition>
      </span>
    </Row>
  );
};
