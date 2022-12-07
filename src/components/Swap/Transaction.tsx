import { useEffect } from 'react';
import { useNetwork, useWaitForTransaction } from 'wagmi';
import { TTransactionStatus, useTransactionDisplay } from '../../context/TransactionDisplayContext';
import Elipsis from '../Elipsis/Elipsis';

interface IProps {
  hash: `0x${string}`,
  status: TTransactionStatus
}

function Transaction({ hash, status }: IProps) {
  const { dispatch: dispatchTransactionDisplay } = useTransactionDisplay();
  const { chain: activeChain } = useNetwork();

  if (!activeChain) return null;

  const {
    data: transactionData,
    isError: transactionIsError,
  } = useWaitForTransaction({ chainId: activeChain.id, hash });

  useEffect(() => {
    if (transactionIsError) {
      console.log('transaction error: ');
      console.log({ transactionData });
    }
    if (transactionData && transactionData!.confirmations >= 1) {
      dispatchTransactionDisplay({ type: 'SET_COMPLETE' });
    }
  }, [transactionData, transactionIsError]);

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
          {hash}
        </a>
      </div>
      <div className="mt-4">
        {status === 'PENDING' && (
          <>
            transaction pending
            <Elipsis />
          </>
        )}
        {status === 'COMPLETE' && 'transaction complete!'}
      </div>
    </div>
  );
}

export default Transaction;
