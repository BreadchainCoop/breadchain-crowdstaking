import { useNetwork } from 'wagmi';
import { ITransaction } from '../../context/TransactionDisplayContext';
import Elipsis from '../Elipsis/Elipsis';

function Transaction({ hash, status }: ITransaction) {
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
