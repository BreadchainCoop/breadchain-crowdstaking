import { useModal } from '../hooks/useModal';
import Button from './Button';

export default function ConnectWallet() {
  const { dispatch } = useModal();
  return (
    <Button
      onClick={() =>
        dispatch({
          type: 'SET_MODAL',
          payload: {
            type: 'CONNECTORS',
            title: 'Connect Wallet',
          },
        })
      }
    >
      Connect
    </Button>
  );
}
