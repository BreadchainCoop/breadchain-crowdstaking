import { useEffect } from 'react';
import { parseEther } from 'viem';
// import { ethers } from 'ethers';
import { useContractWrite } from 'wagmi';

import BREADABI from '../../../../BreadPolygon.json';
import Button from '../../../../components/Button';
import ConnectWalletButton from '../../../../components/ConnectWalletButton';
import { ChainConfiguration } from '../../../../config';
import { useConnectedUser } from '../../../../hooks/useConnectedUser';
import { useModal } from '../../../../hooks/useModal';
import { useToast } from '../../../../hooks/useToast';
import { useTransactionDisplay } from '../../../../hooks/useTransactionDisplay';
// import PreparingTransaction from './PreparingTransaction';

const { abi } = BREADABI;

function ClaimYieldButton({
  amount,
  config,
}: {
  amount: string;
  config: ChainConfiguration;
}) {
  const { state: modalState, dispatch: dispatchModal } = useModal();
  const { dispatch: dispatchToast } = useToast();
  const { dispatch: dispatchTransactionDisplay } = useTransactionDisplay();

  const parsedAmount = parseEther(amount);

  const {
    error: writeError,
    data: writeData,
    isSuccess,
    write,
  } = useContractWrite({
    address: config.BREAD.address,
    abi,
    functionName: 'claimYield',
    args: [parsedAmount],
  });

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

  return <Button onClick={handleSubmit}>Claim</Button>;
}

interface IProps {
  amount: string;
}

export default function ClaimYield({ amount }: IProps) {
  const { user } = useConnectedUser();

  return (
    <section className="flex justify-between">
      {user ? (
        <>
          Claim Yield
          <ClaimYieldButton amount={amount} config={user.config} />
        </>
      ) : (
        <>
          <span>connect wallet to claim</span>
          <ConnectWalletButton />
        </>
      )}
    </section>
  );
}
