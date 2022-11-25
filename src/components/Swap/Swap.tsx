import React, { useEffect } from 'react';
import { useAccount, useSigner } from 'wagmi';
// import { formatEther, parseEther } from 'ethers/lib/utils';
// import { BigNumber } from 'ethers';
import SwapReverse from './SwapReverse';

import Transaction from './Transaction';
import ApproveBreadButton from '../ApproveBreadButton/ApproveBreadButton';
import approveBREAD from '../../api/approveBread';
import Elipsis from '../Elipsis/Elipsis';
import { sanitizeInputValue } from './swapUtils';
import { ChainConfiguration } from '../../config';
import TokenBalance from '../TokenBalance';
import NativeBalance from '../NativeBalance';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { useTokenAllowance } from '../../hooks/useTokenAllowance';
// import { swapDaiForBread } from '../../api/swapDaiForBread';
// import { swapBreadForDai } from '../../api/swapBreadForDai';
import { useToast } from '../../context/ToastContext';
import { useModal } from '../../context/ModalContext';
import { useTransactionDisplay } from '../../context/TransactionDisplayContext';

import FromPanel from './FromPanel';
import ToPanel from './ToPanel';

interface ISwapState {
  mode: 'BAKE' | 'BURN',
  value: string
}

const initialSwapState: ISwapState = {
  mode: 'BAKE',
  value: '',
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

  if (isLoading) return <Elipsis />;
  if (error) return <>Error!</>;
  if (!accountAddress || !signer) return <>Could not connect to wallet</>;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const sanitizedValue = sanitizeInputValue(value);
    setSwapState({
      ...swapState,
      value: sanitizedValue,
    });
  };

  const handleSwapReverse = () => {
    setSwapState((state) => ({
      mode: state.mode === 'BAKE' ? 'BURN' : 'BAKE',
      value: '',
    }));
  };

  const handleBalanceClick = () => {

  };

  const handleApproveContract = async () => {

  };

  const handleSubmit = async () => {

  };

  // TODO: convert to "isContractApproved"
  const showBakeBurnButton = true;
  const showApprovalButton = true;

  return (
    <>
      <FromPanel
        inputValue={swapState.value}
        balanceReadings={swapState.mode === 'BAKE' ? daiBalanceReadings : breadBalanceReadings}
        tokenType={swapState.mode === 'BAKE' ? 'DAI' : 'BREAD'}
        handleBalanceClick={handleBalanceClick}
        handleInputChange={handleInputChange}
      />
      <SwapReverse onClick={handleSwapReverse} />
      <ToPanel
        inputValue={swapState.value}
        balanceReadings={swapState.mode === 'BAKE' ? breadBalanceReadings : daiBalanceReadings}
        tokenType={swapState.mode === 'BAKE' ? 'BREAD' : 'DAI'}
      />
      <div className="w-full px-4 pt-8 pb-12 text-xs">
        Matic
        {' '}
        <NativeBalance addressOrName={accountAddress} />
      </div>

      {/* {
        showBakeBurnButton && (
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
        )
      }
      {
        showApprovalButton && (
          <div className="py-12 text-xs text-neutral-300">
            <div className="pb-6 text-xs text-neutral-300">
              You&apos;ll need to approve the BREAD contract to mint BREAD
            </div>
            <ApproveBreadButton
              handleClick={handleApproveBREAD}
              status="NOT_APPROVED"
            />
          </div>
        )
      } */}
      {
        daiAllowanceReadings.status === 'loading' && (
          <div className="w-full py-12 text-xs text-neutral-300">
            Checking contract approval
            {' '}
            <Elipsis />
          </div>
        )
      }
      {transaction && <Transaction status={transaction.status} hash={transaction.hash} />}
    </>
  );
}

export default SwapUI;
