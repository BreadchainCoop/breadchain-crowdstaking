import React from "react";

import Button from "../Button";
import { useAccount, useConnect } from "wagmi";

const ConnectWalletButton: React.FC<React.PropsWithChildren<unknown>> = (props) => {
  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  if (!!activeConnector && isConnected) return <></>;

  return (
    <div className="mt-12">
      {connectors.map((connector) => {
        return (
          <Button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
          </Button>
        );
      })}

      {error && <div>{error.message}</div>}
    </div>
  );

  // const dispatch = useAppDispatch();
  // const { wallet, network } = useAppSelector((state) => state);
  // // const className = appendClasses(
  // //   props,
  // //   "px-3 py-2 text-sm button-gradient bg-opacity-95 text-neutral-900 hover:bg-opacity-100"
  // // );

  // const handleConnectWallet = async () => {
  //   if (!network.network) throw new Error("network not present!");
  //   // only want to open modal if metamask needs to open
  //   dispatch(
  //     openModal({ type: EModalType.CONNECT_WALLET, title: "Connect Wallet" })
  //   );
  //   try {
  //     const account = await getAccount();
  //     dispatch(setWalletAddress(account));
  //     localStorage.setItem(
  //       "storedAccount",
  //       JSON.stringify({ timestamp: Date.now(), account })
  //     );
  //     dispatch(closeModal());
  //   } catch (err) {
  //     const { message } = err as IProviderRpcError;
  //     dispatch(setToast({ type: EToastType.ERROR, message }));
  //     dispatch(closeModal());
  //   }
  // };

  // return (
  //   <div className="mt-12">
  //     <Button onClick={handleConnectWallet}>
  //       {(() => {
  //         switch (wallet.connected) {
  //           case EWalletConnectionState.NOT_CONNECTED:
  //             return "Connect Wallet";
  //           case EWalletConnectionState.CONNECTING:
  //             return "Connecting";
  //           case EWalletConnectionState.CONNECTED:
  //             if (!wallet) throw new Error("no wallet present in wallet!");
  //             return `address: ${wallet.address}`;
  //           default:
  //             throw new Error("wallet.connected not valid!");
  //         }
  //       })()}
  //     </Button>
  //   </div>
  // );
};

export default ConnectWalletButton;
