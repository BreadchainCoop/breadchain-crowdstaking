import React from "react";

import { appendClasses } from "../../transitions/NiceTransition";

import { getAccount } from "../../api";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  openModal,
  closeModal,
  EModalType,
} from "../../features/modal/modalSlice";
import {
  EWalletConnectionState,
  setWalletAddress,
} from "../../features/wallet/walletSlice";
import TextTransition from "../../transitions/TextTransition";
import { EToastType, setToast } from "../../features/toast/toastSlice";
import { ProviderRpcError } from "../../metamaskErrorType";

const ConnectWalletButton: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const { wallet, network } = useAppSelector((state) => state);
  const className = appendClasses(
    props,
    "px-3 py-2 text-sm button-gradient bg-opacity-95 text-neutral-900 hover:bg-opacity-100"
  );

  const handleConnectWallet = async () => {
    if (!network.network) throw new Error("network not present!");
    // only want to open modal if metamask needs to open
    dispatch(
      openModal({ type: EModalType.CONNECT_WALLET, title: "Connect Wallet" })
    );
    try {
      const account = await getAccount();
      dispatch(setWalletAddress(account));
      localStorage.setItem(
        "storedAccount",
        JSON.stringify({ timestamp: Date.now(), account })
      );
      dispatch(closeModal());
    } catch (err) {
      const { message } = err as ProviderRpcError;
      dispatch(setToast({ type: EToastType.ERROR, message }));
      dispatch(closeModal());
    }
  };

  return (
    <div className="mt-12">
      <button className={className} onClick={handleConnectWallet}>
        <TextTransition>
          {(() => {
            switch (wallet.connected) {
              case EWalletConnectionState.NOT_CONNECTED:
                return "Connect Wallet";
              case EWalletConnectionState.CONNECTING:
                return "Connecting";
              case EWalletConnectionState.CONNECTED:
                if (!wallet) throw new Error("no wallet present in wallet!");
                return `address: ${wallet.address}`;
              default:
                throw new Error("wallet.connected not valid!");
            }
          })()}
        </TextTransition>
      </button>
    </div>
  );
};

export default ConnectWalletButton;
