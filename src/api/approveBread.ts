import { isAddress } from 'ethers/lib/utils';
import { Contract, ethers, Signer } from 'ethers';
import { IProviderRpcError } from '../metamaskErrorType';

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
  if (!isAddress(breadAddress)) {
    dispatchToast({
      type: 'SET_TOAST',
      payload: {
        type: 'ERROR',
        message: `Invalid spender address: ${breadAddress}`,
      },
    });
    return;
  }

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
  } catch (err) {
    const { message } = err as IProviderRpcError;
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
