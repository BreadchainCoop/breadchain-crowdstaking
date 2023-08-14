import { Contract, Signer } from 'ethers';
import { parseEther } from 'ethers/lib/utils';

import { abi as BreadABI } from '../BreadPolygon.json';
import { TModalDispatch } from '../hooks/ModalContext';
import { TToastDispatch } from '../hooks/ToastContext';
import { TTransactionDisplayDispatch } from '../hooks/TransactionDisplayContext';
import { IProviderRpcError } from '../metamaskErrorType';

export const swapDaiForBread = async (
  signer: Signer,
  amount: string,
  breadAddress: string,
  receiverAddress: string,
  dispatchTransactionDisplay: TTransactionDisplayDispatch,
  dispatchToast: TToastDispatch,
  dispatchModal: TModalDispatch,
  resetSwapState: () => void,
) => {
  dispatchModal({
    type: 'SET_MODAL',
    payload: { type: 'BAKING', title: `Baking ${amount} BREAD` },
  });

  const parsedAmount = parseEther(amount);

  const bread = new Contract(breadAddress, BreadABI, signer);

  let txn;

  try {
    txn = await bread.mint(parsedAmount, receiverAddress);
  } catch (err) {
    const { message } = err as IProviderRpcError;
    dispatchModal({ type: 'CLEAR_MODAL' });
    dispatchToast({
      type: 'SET_TOAST',
      payload: {
        type: 'ERROR',
        message,
      },
    });
    return;
  }

  dispatchTransactionDisplay({
    type: 'SET_PENDING',
    payload: { status: 'PENDING', hash: txn.hash },
  });
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
  dispatchTransactionDisplay({ type: 'SET_COMPLETE' });
};

export default swapDaiForBread;
