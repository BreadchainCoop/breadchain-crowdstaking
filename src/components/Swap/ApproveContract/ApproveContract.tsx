import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import Button from '../../Button';

import type { ChainConfiguration } from '../../../config';
import { useModal } from '../../../context/ModalContext';
import { useToast } from '../../../context/ToastContext';
import {
  TTransactionDisplayState,
  useTransactionDisplay,
} from '../../../context/TransactionDisplayContext';
import ERC20ABI from '../../../ERC20.json';

function transactionIsPending(
  transactionDisplay: TTransactionDisplayState,
): boolean {
  if (transactionDisplay && transactionDisplay.status === 'PENDING') {
    return true;
  }
  return false;
}

interface IProps {
  chainConfig: ChainConfiguration;
}

function ApproveContract({ chainConfig }: IProps) {
  const { state: modalState, dispatch: dispatchModal } = useModal();
  const { dispatch: dispatchToast } = useToast();
  const { state: transactionDisplay, dispatch: dispatchTransactionDisplay } =
    useTransactionDisplay();

  const { DAI, BREAD } = chainConfig;

  const { config } = usePrepareContractWrite({
    address: DAI.address,
    abi: ERC20ABI,
    functionName: 'approve',
    args: [BREAD.address, ethers.constants.MaxUint256],
  });

  const { data, error, isSuccess, write } = useContractWrite(config);

  useEffect(() => {
    if (error) {
      if (modalState) dispatchModal({ type: 'CLEAR_MODAL' });
      dispatchToast({
        type: 'SET_TOAST',
        payload: {
          type: 'ERROR',
          message: 'transaction failed',
        },
      });
    }
    if (isSuccess && data) {
      dispatchModal({ type: 'CLEAR_MODAL' });
      dispatchTransactionDisplay({
        type: 'SET_PENDING',
        payload: {
          status: 'PENDING',
          hash: data.hash,
        },
      });
    }
  }, [isSuccess, data, error]);

  const handleApproveContract = async () => {
    dispatchModal({
      type: 'SET_MODAL',
      payload: { type: 'APPROVAL', title: 'Approving BREAD Contract' },
    });
    write?.();
  };

  return (
    <div className="flex flex-col gap-6">
      <Button
        onClick={handleApproveContract}
        variant="large"
        dataTest="approve-contract-button"
        disabled={transactionIsPending(transactionDisplay)}
      >
        Approve Contract
      </Button>
      <div className="pb-6 text-xs text-neutral-300">
        You&apos;ll need to approve the BREAD contract to mint BREAD
      </div>
    </div>
  );
}

export default ApproveContract;
