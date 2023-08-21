import { useEffect } from 'react';
import { parseEther } from 'viem';
// import { ethers } from 'ethers';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import Button from '../../../../components/Button';

import type { ChainConfiguration } from '../../../../config';

import BREADABI from '../../../../BreadPolygon.json';
import { useModal } from '../../../../hooks/useModal';
import { useToast } from '../../../../hooks/useToast';
import { useTransactionDisplay } from '../../../../hooks/useTransactionDisplay.tsx';
// import PreparingTransaction from './PreparingTransaction';

const { abi } = BREADABI;

interface IProps {
  accountAddress: string;
  chainConfig: ChainConfiguration;
  amount: string;
}

export default function ClaimYield({
  chainConfig,
  accountAddress,
  amount,
}: IProps) {
  const { state: modalState, dispatch: dispatchModal } = useModal();
  const { dispatch: dispatchToast } = useToast();
  const { dispatch: dispatchTransactionDisplay } = useTransactionDisplay();

  const { BREAD } = chainConfig;

  const parsedAmount = parseEther(amount);

  console.log({ parsedAmount });
  console.log({ parsedAmount });
  console.log({ parsedAmount });
  console.log({ parsedAmount });
  console.log({ parsedAmount });

  const prepareResult = usePrepareContractWrite({
    address: BREAD.address,
    abi,
    functionName: 'claimYield',
    args: [parsedAmount],
    enabled: !!(chainConfig && accountAddress),
  });

  const { config, status: prepareStatus } = prepareResult;

  const {
    error: writeError,
    data: writeData,
    isSuccess,
    write,
  } = useContractWrite(config);

  const handleSubmit = async () => {
    dispatchModal({
      type: 'SET_MODAL',
      payload: {
        type: 'CLAIMING',
        title: `claiming yield`,
      },
    });

    write?.();
  };

  useEffect(() => {
    if (writeError) {
      if (modalState) dispatchModal({ type: 'CLEAR_MODAL' });
      dispatchToast({
        type: 'SET_TOAST',
        payload: {
          type: 'ERROR',
          message: 'transaction failed',
        },
      });
    }
    if (isSuccess && writeData) {
      dispatchModal({ type: 'UNLOCK_MODAL' });
      dispatchTransactionDisplay({
        type: 'SET_PENDING',
        payload: {
          status: 'PENDING',
          hash: writeData.hash,
        },
      });
    }
  }, [writeError, isSuccess, writeData]);

  return (
    <>
      <Button onClick={handleSubmit} disabled={prepareStatus !== 'success'}>
        Claim
      </Button>
      {/* {prepareStatus === 'loading' && <PreparingTransaction />} */}
    </>
  );
}
