import {
  useEffect,
  // useState
} from 'react';
// import { ethers } from 'ethers';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { parseEther } from 'ethers/lib/utils.js';
import Button from '../../Button';

import type { ChainConfiguration } from '../../../config';

import BREADABI from '../../../BreadPolygon.json';
import useDebounce from '../../../hooks/useDebounce';
import { useModal } from '../../../context/ModalContext';
import { useToast } from '../../../context/ToastContext';
import { useTransactionDisplay } from '../../../context/TransactionDisplayContext';
import { UseTokenBalanceResult } from '../../../hooks/useTokenBalance';

const { abi } = BREADABI;
interface IProps {
  mode: 'BAKE' | 'BURN',
  value: string,
  balanceReadings: UseTokenBalanceResult,
  accountAddress: string,
  chainConfig: ChainConfiguration
  clearInputValue: () => void
}

function BakeOrBurn({
  mode, value, balanceReadings, chainConfig, accountAddress, clearInputValue,
}: IProps) {
  const { state: modalState, dispatch: dispatchModal } = useModal();
  const { dispatch: dispatchToast } = useToast();
  const { dispatch: dispatchTransactionDisplay } = useTransactionDisplay();

  const debouncedValue = useDebounce(value, 500);

  const { BREAD } = chainConfig;

  const parsedValue = parseEther(debouncedValue || '0');

  const prepareResult = usePrepareContractWrite({
    address: BREAD.address,
    abi,
    functionName: mode === 'BAKE' ? 'mint' : 'burn',
    args: [parsedValue, accountAddress],
    enabled: parseFloat(debouncedValue) > 0
      && !!balanceReadings.value
      && parseFloat(debouncedValue) <= parseFloat(balanceReadings.value),
  });

  const { config, status: prepareStatus } = prepareResult;

  const {
    error: writeError, data, isSuccess, write,
  } = useContractWrite(config);

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
      clearInputValue();
    }
    if (isSuccess && data) {
      dispatchModal({ type: 'UNLOCK_MODAL' });
      dispatchTransactionDisplay({
        type: 'SET_PENDING',
        payload: {
          status: 'PENDING',
          hash: data.hash,
        },
      });
      clearInputValue();
    }
  }, [writeError, isSuccess, data]);

  const handleSubmit = async () => {
    dispatchModal({
      type: 'SET_MODAL',
      payload: mode === 'BAKE' ? {
        type: 'BAKING',
        title: `Baking ${value} BREAD`,
      } : {
        type: 'BURNING',
        title: `Burning ${value} BREAD`,
      },
    });
    write?.();
  };

  return (
    <Button
      onClick={handleSubmit}
      disabled={
        prepareStatus !== 'success'
        // || parseFloat(value) === 0
        // || value === ''

      }
      variant="large"
      fullWidth
    >
      {mode === 'BURN' ? 'BURN BREAD' : 'BAKE BREAD'}
    </Button>
  );
}

export default BakeOrBurn;
