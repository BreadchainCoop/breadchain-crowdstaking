import React from 'react';
import { useNetwork } from 'wagmi';
import { ETransactionStatus } from '../../features/transaction/transactionSlice';
import { useAppSelector } from '../../store/hooks';
import Elipsis from '../Elipsis/Elipsis';

function Transaction() {
  const {
    transaction: { status, hash },
  } = useAppSelector((state) => state);

  const { chain: activeChain } = useNetwork();

  if (!activeChain) return null;

  let endpoint: string;

  switch (activeChain.id) {
    case 137:
      endpoint = 'https://polygonscan.com';
      break;
    case 80001:
      endpoint = 'https://mumbai.polygonscan.com';
      break;
    case 1337:
      endpoint = 'http://localhost:8545';
      break;
    default:
      throw new Error('NO ENDPOINT SET');
  }

  return (
    <div className="w-full mt-8 text-xs">
      <div>
        <a
          className="break-all underline"
          target="_blank"
          rel="noopener noreferrer"
          href={`${endpoint}/tx/${hash}`}
        >
          {status === ETransactionStatus.COMPLETE && hash}
        </a>
      </div>
      <div className="mt-4">
        {status === ETransactionStatus.PENDING && (
          <>
            transaction pending
            <Elipsis />
          </>
        )}
        {status === ETransactionStatus.COMPLETE && 'transaction complete!'}
      </div>
    </div>
  );
}

export default Transaction;
