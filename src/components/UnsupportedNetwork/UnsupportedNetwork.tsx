import React from "react";

import Button from "../Button";
import {
  openModal,
  closeModal,
  EModalType,
} from "../../features/modal/modalSlice";
import { useAppDispatch } from "../../store/hooks";
import TextTransition from "../../transitions/TextTransition";

const UnsupportedNetwork: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSwitchToEthereum = async () => {
    // const { appState, dispatch } = useAppState();
    try {
      dispatch(
        openModal({ type: EModalType.CHANGE_NETWORK, title: "Switch Network" })
      );
      const { ethereum } = window as any;
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0x1",
          },
        ],
      });
      dispatch(closeModal());
    } catch (err) {
      // !!! handle in ui?
      console.error("failed switching to ethereum chain!");
      dispatch(closeModal());
    }
  };

  return (
    <div className="flex flex-col">
      <span className="mb-12">
        <TextTransition>
          You are not connected to a supported chain!
        </TextTransition>
      </span>
      <Button onClick={handleSwitchToEthereum}>
        <TextTransition>Switch to Ethereum</TextTransition>
      </Button>
    </div>
  );
};

export default UnsupportedNetwork;
