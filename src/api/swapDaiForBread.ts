import {
  Contract, Signer,
} from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import store from '../store';
import {
  setTransactionComplete,
  setTransactionPending,
} from '../features/transaction/transactionSlice';

import { abi as BreadABI } from '../BreadPolygon.json';
import { TToastDispatch } from '../context/ToastContext';
import { IProviderRpcError } from '../metamaskErrorType';
import { TModalDispatch } from '../context/ModalContext';

export const swapDaiForBread = async (
  signer: Signer,
  amount: string,
  breadAddress: string,
  receiverAddress: string,
  dispatch: typeof store.dispatch,
  dispatchToast: TToastDispatch,
  dispatchModal: TModalDispatch,
  resetSwapState: () => void,
) => {
  const parsedAmount = parseEther(amount);

  const bread = new Contract(breadAddress, BreadABI, signer);

  let txn;

  try {
    txn = await bread.mint(parsedAmount, receiverAddress);
  } catch (err) {
    const { message } = err as IProviderRpcError;
    dispatchToast({
      type: 'SET_TOAST',
      payload: {
        type: 'ERROR',
        message,
      },
    });
  }

  dispatch(setTransactionPending(txn.hash));
  dispatchModal({ type: 'UNLOCK_MODAL' });
  resetSwapState();
  try {
    await txn.wait();
  } catch (err: any) {
    dispatchToast({
      type: 'SET_TOAST',
      payload: {
        type: 'ERROR',
        message: 'bake transaction failed',
      },
    });
  }
  dispatch(setTransactionComplete());
};

export default swapDaiForBread;
