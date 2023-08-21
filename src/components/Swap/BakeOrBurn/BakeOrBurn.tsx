import { useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { parseEther } from 'ethers/lib/utils.js';
import Button from '../../Button';

import type { ChainConfiguration } from '../../../config';

import BREADABI from '../../../BreadPolygon.json';
import useDebounce from '../../../hooks/useDebounce';
import { useModal } from '../../../hooks/useModal';
import { useToast } from '../../../hooks/useToast';
import { UseTokenBalanceResult } from '../../../hooks/useTokenBalance';
import { useTransactionDisplay } from '../../../hooks/useTransactionDisplay';
import PreparingTransaction from './PreparingTransaction';

const { abi } = BREADABI;
interface IProps {
  mode: 'BAKE' | 'BURN';
  value: string;
  balanceReadings: UseTokenBalanceResult;
  accountAddress: string;
  chainConfig: ChainConfiguration;
  clearInputValue: () => void;
}

function BakeOrBurn({
  mode,
  value,
  balanceReadings,
  chainConfig,
  accountAddress,
  clearInputValue,
}: IProps) {
  const { state: modalState, dispatch: dispatchModal } = useModal();
  const { dispatch: dispatchToast } = useToast();
  const { dispatch: dispatchTransactionDisplay } = useTransactionDisplay();

  const debouncedValue = useDebounce(value, 500);

  const { BREAD } = chainConfig;

  const parsedValue = parseEther(
    debouncedValue === '.' ? '0' : debouncedValue || '0',
  );

  const prepareResult = usePrepareContractWrite({
    address: BREAD.address,
    abi,
    functionName: mode === 'BAKE' ? 'mint' : 'burn',
    args: [parsedValue, accountAddress],
    enabled:
      parseFloat(debouncedValue) > 0 &&
      !!balanceReadings.value &&
      parseFloat(debouncedValue) <= parseFloat(balanceReadings.value),
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
      payload: (() => {
        if (mode === 'BAKE') {
          return {
            type: 'BAKING',
            title: `Baking ${value} BREAD`,
          };
        }
        return {
          type: 'BURNING',
          title: `Burning ${value} BREAD`,
        };
      })(),
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
      clearInputValue();
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
      clearInputValue();
    }
  }, [writeError, isSuccess, writeData]);

  return (
    <>
      <Button
        onClick={handleSubmit}
        disabled={prepareStatus !== 'success'}
        variant="large"
        fullWidth
      >
        {mode === 'BURN' ? 'BURN BREAD' : 'BAKE BREAD'}
      </Button>
      {prepareStatus === 'loading' && <PreparingTransaction />}
    </>
  );
}

export default BakeOrBurn;
