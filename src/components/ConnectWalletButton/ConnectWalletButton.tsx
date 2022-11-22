import { useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';

import Button from '../Button';
import { useToast } from '../../context/ToastContext';

function ConnectWalletButton() {
  const { connector: activeConnector, isConnected } = useAccount();
  const {
    connect, connectors, error,
  } = useConnect();
  const { dispatch: toastDispatch } = useToast();

  if (!!activeConnector && isConnected) throw new Error('Connector error!');

  useEffect(() => {
    if (error) toastDispatch({ type: 'SET_TOAST', payload: { type: 'ERROR', message: error.message } });
  }, [error]);

  return (
    <div className="md:mt-10">
      <div className="max-w-72 m-auto flex flex-col gap-4">
        {connectors.map((connector) => (
          <Button
            fullWidth
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
            dataTest={`connect-wallet-${connector.name.toLowerCase()}`}
          >
            {connector.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ConnectWalletButton;
