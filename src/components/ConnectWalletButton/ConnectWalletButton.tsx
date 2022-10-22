import Button from "../Button";
import { useAccount, useConnect } from "wagmi";

const ConnectWalletButton = () => {
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
            dataTest={`connect-wallet-${connector.name.toLowerCase()}`}
          >
            {connector.name}
          </Button>
        );
      })}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default ConnectWalletButton;
