import React, { useEffect } from 'react';

import { useAccount, useSigner } from 'wagmi';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import TokenDisplay from './TokenDisplay';
import Input from './Input';
import Icon from './Icon';
import SwapReverse from './SwapReverse';

import Transaction from './Transaction';
import ApproveBreadButton from '../ApproveBreadButton/ApproveBreadButton';
import approveBREAD from '../../api/approveBread';
import Elipsis from '../Elipsis/Elipsis';
import { sanitizeInputValue } from './swapUtils';
import Button from '../Button';
import { ChainConfiguration } from '../../config';
import TokenBalance from '../TokenBalance';
import NativeBalance from '../NativeBalance';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { useTokenAllowance } from '../../hooks/useTokenAllowance';
import { swapDaiForBread } from '../../api/swapDaiForBread';
import { swapBreadForDai } from '../../api/swapBreadForDai';
import { useToast } from '../../context/ToastContext';
import { useModal } from '../../context/ModalContext';
import { useTransactionDisplay } from '../../context/TransactionDisplayContext';

interface ISwapState {
  from: {
    name: 'DAI' | 'BREAD';
    value: string;
    bnValue: BigNumber;
  };
  to: {
    name: 'DAI' | 'BREAD';
    value: string;
    bnValue: BigNumber;
  };
}

const initialSwapState: ISwapState = {
  from: {
    name: 'DAI',
    value: '',
    bnValue: BigNumber.from(0),
  },
  to: {
    name: 'BREAD',
    value: '',
    bnValue: BigNumber.from(0),
  },
};

function SwapUI({ chainConfig, accountAddress }: {
  chainConfig: ChainConfiguration;
  accountAddress: string;
}) {
  const [swapState, setSwapState] = React.useState<ISwapState>(initialSwapState);

  const { DAI, BREAD } = chainConfig;

  const { state: transaction, dispatch: dispatchTransactionDisplay } = useTransactionDisplay();
  const { dispatch: dispatchToast } = useToast();
  const { dispatch: dispatchModal } = useModal();
  const { isConnecting } = useAccount();

  const {
    data: signer,
    isFetching: isFetchingSigner,
    error: signerError,
  } = useSigner();

  const breadBalanceReadings = useTokenBalance(BREAD.address, accountAddress);
  const daiBalanceReadings = useTokenBalance(DAI.address, accountAddress);

  const daiAllowanceReadings = useTokenAllowance(
    DAI.address,
    accountAddress,
    BREAD.address,
  );

  const resetSwapState = () => {
    setSwapState(initialSwapState);
  };

  useEffect(() => {
    resetSwapState();
  }, [chainConfig.NETWORK_STRING]);

  const isLoading = isConnecting || isFetchingSigner;
  const error = signerError;

  const inputTokenReadings = swapState.from.name === 'BREAD' ? breadBalanceReadings : daiBalanceReadings;

  const outputTokenReadings = swapState.to.name === 'BREAD' ? breadBalanceReadings : daiBalanceReadings;

  if (isLoading) return <Elipsis />;
  if (error) return <>Error!</>;
  if (!accountAddress || !signer) return <>Could not connect to wallet</>;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const sanitizedValue = sanitizeInputValue(value);
    const bnValue = parseEther(sanitizedValue || '0');

    setSwapState({
      from: {
        name: swapState.from.name,
        value: sanitizedValue,
        bnValue,
      },
      to: {
        name: swapState.to.name,
        value: sanitizedValue,
        bnValue,
      },
    });
  };

  const handleSwapReverse = () => {
    setSwapState((state) => ({
      from: { ...state.to, value: '0' },
      to: { ...state.from, value: '0' },
    }));
  };

  const handleBalanceClick = () => {
    if (!inputTokenReadings.value) return;
    const swapStateCopy = swapState;
    swapStateCopy.from.value = formatEther(inputTokenReadings.value);
    setSwapState({ ...swapStateCopy });
  };

  const handleApproveBREAD = async () => {
    await approveBREAD(
      signer,
      DAI.address,
      BREAD.address,
      dispatchTransactionDisplay,
      dispatchToast,
      dispatchModal,
    );
  };

  const handleSwapDaiForBread = async () => {
    if (swapState.from.name !== 'DAI') return;

    swapDaiForBread(
      signer,
      swapState.from.value,
      BREAD.address,
      accountAddress,
      dispatchTransactionDisplay,
      dispatchToast,
      dispatchModal,
      resetSwapState,
    ).catch((err: any) => {
      const message = err.data ? err.data.message : err.message;
      dispatchToast({
        type: 'SET_TOAST',
        payload: {
          type: 'ERROR',
          message,
        },
      });
      dispatchModal({ type: 'CLEAR_MODAL' });
    });
  };

  const handleSwapBreadForDai = async () => {
    if (swapState.from.name !== 'BREAD') return;

    swapBreadForDai(
      signer,
      swapState.from.value,
      BREAD.address,
      accountAddress,
      dispatchTransactionDisplay,
      dispatchToast,
      dispatchModal,
      resetSwapState,
    ).catch((err: any) => {
      const message = err.data ? err.data.message : err.message;
      dispatchToast({
        type: 'SET_TOAST',
        payload: {
          type: 'ERROR',
          message,
        },
      });
      dispatchModal({ type: 'CLEAR_MODAL' });
    });
  };

  const handleSubmit = async () => {
    if (!['DAI', 'BREAD'].includes(swapState.from.name)) return;

    if (swapState.from.name === 'DAI') handleSwapDaiForBread();
    if (swapState.from.name === 'BREAD') handleSwapBreadForDai();
  };

  const showBakeBurnButton = swapState.from.name === 'BREAD'
    || (swapState.from.name === 'DAI'
      && daiAllowanceReadings.value?.gte(swapState.from.bnValue));

  const showApprovalButton = swapState.from.name === 'DAI'
    && transaction?.status !== 'PENDING'
    && (daiAllowanceReadings.value?.lt(swapState.from.bnValue)
      || daiAllowanceReadings.value?.eq(0));

  return (
    <>
      <TokenDisplay.Container>
        {swapState ? (
          <>
            <TokenDisplay.Header>
              <TokenDisplay.BalanceButton onClick={handleBalanceClick}>
                <TokenBalance
                  value={inputTokenReadings.value}
                  status={inputTokenReadings.status}
                  error={inputTokenReadings.error}
                />
              </TokenDisplay.BalanceButton>
            </TokenDisplay.Header>
            <TokenDisplay.Content>
              <Input
                name="from"
                value={swapState.from.value}
                handleInputChange={handleInputChange}
              />
              <Icon type={swapState.from.name} />
              <span className="ml-4 w-20 pt-0.5">{swapState.from.name}</span>
            </TokenDisplay.Content>
          </>
        ) : (
          <span>No SwapState</span>
        )}
      </TokenDisplay.Container>
      <SwapReverse onClick={handleSwapReverse} />
      <TokenDisplay.Container>
        {swapState && (
          <>
            <TokenDisplay.Header>
              <TokenDisplay.Balance>
                <TokenBalance
                  value={outputTokenReadings.value}
                  status={outputTokenReadings.status}
                  error={inputTokenReadings.error}
                />
              </TokenDisplay.Balance>
            </TokenDisplay.Header>
            <TokenDisplay.Content>
              <span className="bg-breadgray-100 p-4 mr-8 text-lg sm:text-2xl truncate overflow-ellipsis w-0 flex-auto">
                {swapState.to.value ? swapState.to.value : '00.00'}
              </span>
              <Icon type={swapState.to.name} />
              <span className="ml-4 w-20 pt-0.5">{swapState.to.name}</span>
            </TokenDisplay.Content>
          </>
        )}
      </TokenDisplay.Container>
      <div className="w-full px-4 pt-8 pb-12 text-xs">
        Matic
        {' '}
        <NativeBalance addressOrName={accountAddress} />
      </div>

      {showBakeBurnButton && (
        <Button
          onClick={handleSubmit}
          disabled={
            transaction?.status === 'PENDING'
            || parseFloat(swapState.from.value) === 0
            || swapState.from.value === ''
            || daiAllowanceReadings.value?.lt(swapState.from.bnValue)
          }
          variant="large"
          fullWidth
        >
          {swapState.from.name === 'BREAD' ? 'BURN BREAD' : 'BAKE BREAD'}
        </Button>
      )}
      {showApprovalButton && (
        <div className="py-12 text-xs text-neutral-300">
          <div className="pb-6 text-xs text-neutral-300">
            You&apos;ll need to approve the BREAD contract to mint BREAD
          </div>
          <ApproveBreadButton
            handleClick={handleApproveBREAD}
            status="NOT_APPROVED"
          />
        </div>
      )}
      {daiAllowanceReadings.status === 'loading' && (
        <div className="w-full py-12 text-xs text-neutral-300">
          Checking contract approval
          {' '}
          <Elipsis />
        </div>
      )}

      {transaction && <Transaction status={transaction.status} hash={transaction.hash} />}
    </>
  );
}

export default SwapUI;
