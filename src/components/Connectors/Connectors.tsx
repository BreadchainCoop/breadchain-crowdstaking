import { useEffect } from 'react';
import { useConnect } from 'wagmi';

import { useModal } from '../../hooks/useModal';
import { useToast } from '../../hooks/useToast';
import Button from '../Button';

export default function Connectors() {
  // const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isSuccess } = useConnect();
  const { dispatch: toastDispatch } = useToast();
  const { dispatch: modalDispatch } = useModal();

  // if (!!activeConnector && isConnected) throw new Error('Connector error!');

  useEffect(() => {
    if (error)
      toastDispatch({
        type: 'SET_TOAST',
        payload: { type: 'ERROR', message: error.message },
      });
  }, [error]);

  useEffect(() => {
    if (isSuccess)
      modalDispatch({
        type: 'CLEAR_MODAL',
      });
  }, [isSuccess]);

  return (
    <div>
      <div className="max-w-72 m-auto flex flex-col gap-4">
        {connectors &&
          connectors.map((connector) => (
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
