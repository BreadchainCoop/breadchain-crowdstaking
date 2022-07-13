import React from "react";
import { allChains, useDisconnect, useNetwork } from "wagmi";
import { ENetwork } from "../../features/network/networkSlice";

import TextTransition from "../../transitions/TextTransition";
import Button from "../Button";
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

export const Network: React.FC = () => {
  const { isError, isLoading, error, activeChain, chains } = useNetwork();
  const { disconnectAsync } = useDisconnect();
  if (isError) return <Row>{error}</Row>;
  if (isLoading) return <Row>Loading</Row>;

  return (
    <Row>
      <IconContainer>
        <NetworkIcon />
      </IconContainer>
      <span>
        <TextTransition>
          {activeChain?.unsupported && "Unsupported network: "}
          {activeChain?.name}
        </TextTransition>
      </span>

      <Button variant="small" onClick={() => disconnectAsync()}>
        Disconnect
      </Button>
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
