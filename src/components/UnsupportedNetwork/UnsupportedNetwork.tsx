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
            chainId: "0x89",
          },
        ],
      });
      dispatch(
        openModal({
          type: EModalType.CHANGING_NETWORK,
          title: "Switching Network...",
        })
      );
    } catch (err) {
      // !!! handle in ui?
      console.error("failed switching to ethereum chain!");
      dispatch(closeModal());
    }
  };

  return (
    <div className="flex flex-col">
      <span className="mb-12 text-xs sm:text-base text-center">
        <TextTransition>
          You are not connected to a supported chain!
        </TextTransition>
      </span>
      <span className="flex justify-center">
        <Button onClick={handleSwitchToEthereum}>
          <TextTransition>Connect to Polygon</TextTransition>
        </Button>
      </span>
    </div>
  );
};

export default UnsupportedNetwork;
