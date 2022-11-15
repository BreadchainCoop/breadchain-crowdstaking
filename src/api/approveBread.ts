import { Contract, ethers, Signer } from 'ethers';

import ERC20ABI from '../ERC20.json';
import { TToastDispatch } from '../context/ToastContext';
import { TModalDispatch } from '../context/ModalContext';
import { TTransactionDisplayDispatch } from '../context/TransactionDisplayContext';

export const approveBREAD = async (
  signer: Signer,
  daiAddress: string,
  breadAddress: string,
  dispatchTransactionDisplay: TTransactionDisplayDispatch,
  dispatchToast: TToastDispatch,
  dispatchModal: TModalDispatch,
): Promise<void> => {
  const dai = new Contract(daiAddress, ERC20ABI, signer);

  dispatchModal({
    type: 'SET_MODAL',
    payload: {
      type: 'APPROVAL', title: 'Approving BREAD Contract',
    },
  });

  let txn;
  try {
    txn = await dai.approve(breadAddress, ethers.constants.MaxUint256);
  } catch (err: any) {
    const message = err.reason ? err.reason : err.message;
    dispatchToast({
      type: 'SET_TOAST',
      payload: {
        type: 'ERROR',
        message,
      },
    });
    dispatchModal({ type: 'CLEAR_MODAL' });
    return;
  }
  dispatchModal({ type: 'CLEAR_MODAL' });
  dispatchTransactionDisplay({ type: 'SET_PENDING', payload: { status: 'PENDING', hash: txn.hash } });
  try {
    await txn.wait();
    dispatchTransactionDisplay({ type: 'SET_COMPLETE' });
  } catch (err) {
    dispatchToast({
      type: 'SET_TOAST',
      payload: {
        type: 'ERROR',
        message: 'Approve transaction failed',
      },
    });
  }
};

export default approveBREAD;
