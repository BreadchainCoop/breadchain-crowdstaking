import Button from '../Button';

import { useModal } from '../../context/ModalContext';

function UnsupportedNetwork() {
  const { dispatch: modalDispatch } = useModal();

  const handleSwitchToEthereum = async () => {
    try {
      modalDispatch({
        type: 'SET_MODAL',
        payload: { type: 'CHANGE_NETWORK', title: 'Switch Network' },
      });
      const { ethereum } = window as any;
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: '0x89',
          },
        ],
      });
      modalDispatch({ type: 'CLEAR_MODAL' });
    } catch (err) {
      // !!! error not handled
      modalDispatch({ type: 'CLEAR_MODAL' });
    }
  };

  return (
    <div className="flex flex-col px-4">
      <span className="mb-12 text-center text-xs sm:text-base">
        You are not connected to a supported chain!
      </span>
      <span className="flex justify-center">
        <Button onClick={handleSwitchToEthereum}>Connect to Polygon</Button>
      </span>
    </div>
  );
}

export default UnsupportedNetwork;
